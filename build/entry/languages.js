import i18n from './i18n.js'

const languages = []
for (const language in i18n) {
  const baseLanguage = language.split('-')[0]
  languages.push({
    key: baseLanguage,
    value: i18n[language].language
  })
}
export default languages
