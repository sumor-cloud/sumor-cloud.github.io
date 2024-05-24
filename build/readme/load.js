import packagesInfo from '../packagesInfo.js'
import npmUtils from '../../src/npm/index.js'
import fse from 'fs-extra'

export default async () => {
  for (const pkg in packagesInfo) {
    const path = `${process.cwd()}/readmes/${pkg}`
    await fse.ensureDir(path)
    console.log(`Reading ${pkg} readme...`)
    await npmUtils.readme(packagesInfo[pkg].npm, path)
    console.log(`Read ${pkg} readme`)
  }
}
