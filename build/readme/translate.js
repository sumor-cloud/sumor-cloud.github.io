import { glob } from 'glob'
import fse from 'fs-extra'
import Model from '@sumor/llm-connector'
import packagesInfo from '../packagesInfo.js'
const languages = [
  'en-US',
  'zh-CN',
  'es-ES',
  'fr-FR',
  'de-DE',
  'ja-JP',
  'ko-KR',
  'ru-RU',
  'pt-BR',
  'ar-SA'
]
// const languages = ["en", "zh", "es", "fr", "de", "ja", "ko", "ru", "pt", "ar"];

const config = await fse.readJson(`${process.cwd()}/config.json`)
const model = new Model({
  type: 'openAI',
  key: config.llm
})

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export default async () => {
  const max = 30
  let count = 0
  for (const pkg in packagesInfo) {
    const sourcePath = `${process.cwd()}/readmes/${pkg}`
    const files = await glob('**/*', { cwd: sourcePath })
    for (const language of languages) {
      const baseLanguage = language.split('-')[0]
      const targetPath = `${process.cwd()}/readmesTranslate/${baseLanguage}/${pkg}`
      await fse.ensureDir(targetPath)
      for (const file of files) {
        const targetFilePath = `${targetPath}/${file}`
        const sourceFilePath = `${sourcePath}/${file}`

        // // fix legacy empty case issue
        // if (await fse.exists(sourceFilePath)) {
        //   const sourceFile = await fse.readFile(sourceFilePath, 'utf-8')
        //   if (sourceFile.length === 0) {
        //     await fse.remove(targetFilePath)
        //   }
        // }
        // if (await fse.exists(targetFilePath)) {
        //   const targetFile = await fse.readFile(targetFilePath, 'utf-8')
        //   if (targetFile.length === 0) {
        //     await fse.remove(targetFilePath)
        //   }
        // }

        if (!(await fse.exists(targetFilePath))) {
          if (baseLanguage === 'en') {
            await fse.copy(sourceFilePath, targetFilePath)
          } else {
            const translateFile = await fse.readFile(sourceFilePath, 'utf-8')
            if (translateFile.length === 0) {
              await fse.writeFile(targetFilePath, '')
            } else if (translateFile.length < 7000) {
              console.log(`Translating ${pkg} ${file} to ${language}...`)
              if (count < max) {
                count++
                const startTime = Date.now()
                const llmResult = await model.chat('gpt-3.5-turbo', [
                  {
                    role: 'system',
                    content: `Translate user-entered Markdown content. The user's language code is ${language}. Only output the result, no need additional information.`
                  },
                  {
                    role: 'user',
                    content: translateFile
                  }
                ])
                const translatedFile = llmResult.content
                await fse.writeFile(targetFilePath, translatedFile)
                console.log(`Translated in ${Date.now() - startTime}ms...`)
                await delay(100)
              } else {
                console.log(`Skip ${pkg} ${file} to ${language} due to rate limit ${max} times...`)
                return
              }
            } else {
              console.log(
                `Skip ${pkg} ${file} to ${language} due to length ${translateFile.length}...`
              )
            }
          }
        }
      }
    }
  }
}
