export default ({ language, languages, pkg, version, versions, html, translateInfo }) => {
  const languageDialog = languages.map(({ key, value }) => {
    if (key === 'en') {
      return `<a href="/${pkg}/${version}.html">${value}</a>`
    } else {
      return `<a href="/${key}/${pkg}/${version}.html">${value}</a>`
    }
  }).join(' | ')
  const versionList = versions.map(version => {
    if (language === 'en') {
      return `<a href="/${pkg}/${version}.html">v${version}</a>`
    } else {
      return `<a href="/${language}/${pkg}/${version}.html">v${version}</a>`
    }
  }).join('\n')
  return `
<html lang="${language}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@sumor/${pkg} v${version}</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
    <link rel="stylesheet" href="/styles/index.css">
</head>
<body>
    <div class="pageHeader">
        <div class="bgMask"></div>
        <div class="pageHeaderInner">
            <div class="logo">
                <a href="/${language === 'en' ? '' : language}">${translateInfo.title}</a>
            </div>
            <div class="pageTitle">
                <div class="text">@sumor/${pkg}</div>
                <div class="versionBox">
                    <div class="version">
                    v${version}
                    <div class="versions">
                        ${versionList}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="body">
        ${html}
    </div>
    <div class="footer">
        <div class="languagesFooter">
            ${languageDialog}
        </div>
    </div>
</body>
</html>`
}
