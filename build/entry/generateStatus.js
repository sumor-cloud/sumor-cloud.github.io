import packagesInfo from '../packagesInfo.js'
import { marked } from 'marked'

export default async language => {
  const packages = Object.keys(packagesInfo)

  let markdown = ''
  const packagesStatus = packages.map(pkg => {
    const status = `
[![NPM Version](https://img.shields.io/npm/v/@sumor/${pkg}?logo=npm&label=NPM)](https://www.npmjs.com/package/@sumor/${pkg})
[![NPM Downloads](https://img.shields.io/npm/dw/@sumor/${pkg}?logo=npm&label=Downloads)](https://www.npmjs.com/package/@sumor/${pkg})
[![GitHub CI](https://img.shields.io/github/actions/workflow/status/sumor-cloud/${pkg}/ci.yml?logo=github&label=CI)](https://github.com/sumor-cloud/${pkg}/actions/workflows/ci.yml)
[![GitHub Test](https://img.shields.io/github/actions/workflow/status/sumor-cloud/${pkg}/ut.yml?logo=github&label=Test)](https://github.com/sumor-cloud/${pkg}/actions/workflows/ut.yml)
[![GitHub Coverage](https://img.shields.io/github/actions/workflow/status/sumor-cloud/${pkg}/coverage.yml?logo=github&label=Coverage)](https://github.com/sumor-cloud/${pkg}/actions/workflows/coverage.yml)
[![GitHub Audit](https://img.shields.io/github/actions/workflow/status/sumor-cloud/${pkg}/audit.yml?logo=github&label=Audit)](https://github.com/sumor-cloud/${pkg}/actions/workflows/audit.yml)`

    return `## [@sumor/${pkg}](${language === 'en' ? '' : `/${language}`}/${pkg})\n${status}\n`
  })

  markdown += packagesStatus.join('\n\n')
  let html = marked(markdown)

  html = html.replace(/<a/g, '<a dir="ltr"')

  return html
}
