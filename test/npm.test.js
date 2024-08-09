import { describe, expect, it } from '@jest/globals'
import npmUtils from '../src/npm/index.js'
import fse from 'fs-extra'

describe('Npm Utils', () => {
  it('versions', async () => {
    const { activeVersions, deprecatedVersions } = await npmUtils.versions('@sumor/storage')
    expect(activeVersions).toBeDefined()
    expect(activeVersions.indexOf('1.0.0')).toBeGreaterThan(-1)
    expect(deprecatedVersions.indexOf('17.0.0')).toBeGreaterThan(-1)
  })
  it('download', async () => {
    const path = await npmUtils.download('@sumor/logger', '1.0.0')
    const packageInfo = await fse.readJson(`${path}/package.json`)
    expect(packageInfo).toBeDefined()
    expect(packageInfo.name).toBe('@sumor/logger')
  })
  it(
    'readme',
    async () => {
      const tmpPath = `${process.cwd()}/tmp/readme`
      await fse.remove(tmpPath)
      await fse.ensureDir(tmpPath)
      await fse.writeFile(`${tmpPath}/1.0.1.md`, '# Overwrite')
      await npmUtils.readme('@sumor/logger', tmpPath)

      const MD100 = await fse.readFile(`${tmpPath}/1.0.0.md`, 'utf-8')
      expect(MD100).toBeDefined()
      expect(MD100.indexOf('# logger')).toBeGreaterThan(-1)

      const MD101 = await fse.readFile(`${tmpPath}/1.0.1.md`, 'utf-8')
      expect(MD101).toBeDefined()
      expect(MD101.indexOf('# logger')).toEqual(-1)
      expect(MD101.indexOf('# Overwrite')).toBeGreaterThan(-1)
    },
    60 * 1000
  )
})
