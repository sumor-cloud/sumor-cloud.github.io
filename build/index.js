import loadIndex from './entry/index.js'
import loadScss from './loadScss.js'
import fse from 'fs-extra'
import generateReadme from './readme/generate.js'

await fse.remove(`${process.cwd()}/output/web`)
await generateReadme()
await loadIndex()
await loadScss()
await fse.copy(`${process.cwd()}/static`, `${process.cwd()}/output/web`)
