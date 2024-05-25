import packagesInfo from '../packagesInfo.js'
import { marked } from 'marked'

export default async (language) => {
  const packages = Object.keys(packagesInfo)

  let markdown = ''
  const packagesStatus = packages.map(pkg => {
    const status = `[![CI](https://github.com/sumor-cloud/${pkg}/actions/workflows/ci.yml/badge.svg)](https://github.com/sumor-cloud/${pkg}/actions/workflows/ci.yml)
[![Test](https://github.com/sumor-cloud/${pkg}/actions/workflows/ut.yml/badge.svg)](https://github.com/sumor-cloud/${pkg}/actions/workflows/ut.yml)
[![Coverage](https://github.com/sumor-cloud/${pkg}/actions/workflows/coverage.yml/badge.svg)](https://github.com/sumor-cloud/${pkg}/actions/workflows/coverage.yml)
[![Audit](https://github.com/sumor-cloud/${pkg}/actions/workflows/audit.yml/badge.svg)](https://github.com/sumor-cloud/${pkg}/actions/workflows/audit.yml)`

    return `## [@sumor/${pkg}](${language === 'en' ? '' : `/${language}`}/${pkg})\n${status}\n`
  })

  markdown += packagesStatus.join('\n\n')
  let html = marked(markdown)

  html = html.replace(/<a/g, '<a dir="ltr"')

  return html
}
