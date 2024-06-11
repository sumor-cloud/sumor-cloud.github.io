import fse from 'fs-extra'
import i18n from './i18n.js'
import pageTemplate from './pageTemplate.js'
import languages from './languages.js'
import generateStatus from './generateStatus.js'

export default async data => {
  const output = `${process.cwd()}/output/web`
  await fse.ensureDir(output)

  for (const language in i18n) {
    const baseLanguage = language.split('-')[0]
    const translateInfo = i18n[language]

    const statusHtml = await generateStatus(language)
    const languageHome = `${output}/${language}`
    await fse.ensureDir(languageHome)
    await fse.writeFile(
      `${languageHome}/index.html`,
      pageTemplate({
        ...translateInfo,
        language,
        languages,
        statusHtml
      })
    )

    const baseStatusHtml = await generateStatus(baseLanguage)
    let baseLanguageHome = `${output}/${baseLanguage}`
    if (baseLanguage === 'en') {
      baseLanguageHome = output
    }
    await fse.ensureDir(baseLanguageHome)
    await fse.writeFile(
      `${baseLanguageHome}/index.html`,
      pageTemplate({
        ...translateInfo,
        language: baseLanguage,
        languages,
        statusHtml: baseStatusHtml
      })
    )
  }
}
