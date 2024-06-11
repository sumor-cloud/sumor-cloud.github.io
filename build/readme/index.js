import loadReadme from './load.js'
import translateReadme from './translate.js'

const rerun = async callback => {
  try {
    await callback()
  } catch (e) {
    console.error(e)
    await rerun(callback)
  }
}

await loadReadme()
await rerun(translateReadme)
