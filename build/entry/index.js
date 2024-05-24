import fse from 'fs-extra'
import i18n from './i18n.js'
import pageTemplate from './pageTemplate.js'
import packagesInfo from '../packagesInfo.js'
import languages from './languages.js'

export default async (data) => {
  const output = `${process.cwd()}/output/web`
  await fse.ensureDir(output)

  const packages = Object.keys(packagesInfo)

  for (const language in i18n) {
    const baseLanguage = language.split('-')[0]
    const translateInfo = i18n[language]

    const languageHome = `${output}/${language}`
    await fse.ensureDir(languageHome)
    await fse.writeFile(`${languageHome}/index.html`, pageTemplate({
      ...translateInfo,
      language,
      languages,
      packages
    }))

    let baseLanguageHome = `${output}/${baseLanguage}`
    if (baseLanguage === 'en') {
      baseLanguageHome = output
    }
    await fse.ensureDir(baseLanguageHome)
    await fse.writeFile(`${baseLanguageHome}/index.html`, pageTemplate({
      ...translateInfo,
      language: baseLanguage,
      languages,
      packages
    }))
  }
}
