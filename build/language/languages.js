export default () => {
  const codes = ['en_US', 'zh_CN', 'zh_TW', 'ko_KR', 'ja_JP', 'fr_FR', 'es_ES']
  const translates = ['English', '简体中文', '繁体中文', '한국어', '日本語', 'Français', 'Español']

  const languages = []
  for (let i = 0; i < codes.length; i++) {
    const translate = translates[i]

    const main = codes[i].split('_')[0]
    const existsMain = languages.find(l => l.main === main)
    languages.push({
      code: codes[i],
      main: existsMain ? null : main,
      translate
    })
  }
}
