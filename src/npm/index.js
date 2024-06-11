import { execSync } from 'child_process'
import fse from 'fs-extra'
import versionSorter from '../utils/versionSorter.js'
const versions = async name => {
  try {
    let result = await execSync(`npm view ${name} versions --json`, { encoding: 'utf8' })
    result = JSON.parse(result)
    if (typeof result === 'string') {
      result = [result]
    }
    return versionSorter(result)
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
const readme = async (name, path) => {
  await fse.ensureDir(`${path}`)
  const allVersions = await versions(name)
  for (const version of allVersions) {
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
