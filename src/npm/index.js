import { execSync } from 'child_process'
import fse from 'fs-extra'
import versionSorter from '../utils/versionSorter.js'
const versions = async name => {
  try {
    const fetchNPMArr = function (cmd) {
      let result = execSync(cmd, {
        encoding: 'utf8'
      })
      result = JSON.parse(result)
      if (typeof result === 'string') {
        result = [result]
      }
      return result
    }
    const allVersions = fetchNPMArr(`npm view ${name} versions --json`)

    const checkDeprecated = function (version) {
      const cmd = `npm view ${name}@${version} deprecated --json`
      const result = execSync(cmd, {
        encoding: 'utf8'
      })
      if (result && result !== '') {
        return true
      } else {
        return false
      }
    }
    const deprecatedVersions = []
    const activeVersions = []
    for (let i = 0; i < allVersions.length; i++) {
      if (checkDeprecated(allVersions[i])) {
        deprecatedVersions.push(allVersions[i])
      } else {
        activeVersions.push(allVersions[i])
      }
    }
    return {
      deprecatedVersions: versionSorter(deprecatedVersions),
      activeVersions: versionSorter(activeVersions)
    }
  } catch (e) {
    return []
  }
}
const download = async (name, version) => {
  try {
    const path = `${process.cwd()}/tmp/npm/${name}/${version}`
    await fse.remove(path)
    await fse.ensureDir(path)
    await fse.writeFile(`${path}/package.json`, '{}')
    await execSync(`npm i --save ${name}@${version}`, {
      cwd: path
    })
    await fse.copy(`${path}/node_modules/${name}`, `${path}/package`)
    return `${path}/package`
  } catch (e) {
    return null
  }
}
const updateFile = async (path, content) => {
  const exists = await fse.exists(path)
  if (exists) {
    const oldContent = await fse.readFile(path, 'utf-8')
    if (oldContent !== content) {
      await fse.writeFile(path, content)
    }
  } else {
    await fse.writeFile(path, content)
  }
}
const readme = async (name, path) => {
  await fse.ensureDir(`${path}`)
  const { activeVersions, deprecatedVersions } = await versions(name)
  const versionsJsonPath = `${path}/versions.json`
  const deprecatedJsonPath = `${path}/deprecated.json`
  await updateFile(versionsJsonPath, JSON.stringify(activeVersions))
  await updateFile(deprecatedJsonPath, JSON.stringify(deprecatedVersions))
  for (const version of activeVersions) {
    const versionReadmePath = `${path}/${version}.md`
    if (!(await fse.exists(versionReadmePath))) {
      const versionPath = await download(name, version)
      if (versionPath) {
        const readmeNames = ['README.md', 'ReadMe.md', 'readme.md']
        for (const readmeName of readmeNames) {
          const readmePath = `${versionPath}/${readmeName}`
          if (await fse.exists(readmePath)) {
            await fse.copy(readmePath, versionReadmePath)
          }
        }
        if (!(await fse.exists(versionReadmePath))) {
          await fse.writeFile(versionReadmePath, '')
        }
      }
    }
  }
}
export default {
  versions,
  download,
  readme
}
