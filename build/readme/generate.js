import fse from 'fs-extra'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import packagesInfo from '../packagesInfo.js'
import versionSorter from '../../src/utils/versionSorter.js'
import pageTemplate from './pageTemplate.js'
import i18n from '../entry/i18n.js'
import languages from '../entry/languages.js'

const languageCodes = [
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

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight (code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    }
  })
)

export default async () => {
  for (const pkg in packagesInfo) {
    for (const language of languageCodes) {
      const baseLanguage = language.split('-')[0]
      const sourcePath = `${process.cwd()}/readmesTranslate/${baseLanguage}/${pkg}`
      if (await fse.exists(sourcePath)) {
        const files = await fse.readdir(sourcePath)
        const versions = versionSorter(files.map(file => file.replace('.md', '')))
        for (const version of versions) {
          const fileName = `${version}.md`
          const filePath = `${sourcePath}/${fileName}`
          if (await fse.exists(filePath)) {
            let targetPath = `${process.cwd()}/output/web/${baseLanguage}/${pkg}`
            if (baseLanguage === 'en') {
              targetPath = `${process.cwd()}/output/web/${pkg}`
            }
            const targetLanguagePath = `${process.cwd()}/output/web/${language}/${pkg}`
            await fse.ensureDir(targetPath)
            await fse.ensureDir(targetLanguagePath)
            const content = await fse.readFile(filePath, 'utf-8')
            let html = ''
            if (content !== '') {
              html = marked.parse(content)
            }
            const translateInfo = i18n[language]
            await fse.writeFile(
              `${targetPath}/${version}.html`,
              pageTemplate({
                language: baseLanguage,
                languages,
                pkg,
                version,
                versions,
                html,
                translateInfo
              })
            )
            await fse.writeFile(
              `${targetLanguagePath}/${version}.html`,
              pageTemplate({
                language,
                languages,
                pkg,
                version,
                versions,
                html,
                translateInfo
              })
            )
          }
        }
        const latestVersion = versions[versions.length - 1]
        let latestPath = `${process.cwd()}/output/web/${baseLanguage}/${pkg}/${latestVersion}.html`
        let indexPath = `${process.cwd()}/output/web/${baseLanguage}/${pkg}/index.html`
        if (baseLanguage === 'en') {
          latestPath = `${process.cwd()}/output/web/${pkg}/${latestVersion}.html`
          indexPath = `${process.cwd()}/output/web/${pkg}/index.html`
        }
        if (await fse.exists(latestPath)) {
          await fse.copy(latestPath, indexPath)
        }
      }
    }
  }
}
