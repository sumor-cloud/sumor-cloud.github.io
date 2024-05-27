export default ({ language, languages, pkg, version, versions, html, translateInfo }) => {
  const languageButtons = languages.map(({ key, value }) => {
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
  let rightToLeft = ''
  const baseLanguage = language.split('-')[0]
  if (baseLanguage === 'ar' || baseLanguage === 'fa' || baseLanguage === 'he') {
    rightToLeft = ' dir="rtl"'
  }

  html = html.replace(/<code/g, '<code dir="ltr"')
  return `
<html lang="${language}"${rightToLeft}>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@sumor/${pkg} v${version}</title>
    
    <!--Favicons-->
    <link rel="shortcut icon" href="/images/favicon.ico" />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/images/favicon-16x16.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/images/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="48x48"
      href="/images/favicon-48x48.png"
    />
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
    <link rel="stylesheet" href="/styles/index.css">
</head>
<body>
    <div class="header">
        <video class="light" autoplay muted loop>
          <source src="/videos/Cover.mp4" type="video/mp4">
        </video>
        <video class="dark" autoplay muted loop>
          <source src="/videos/CoverDark.mp4" type="video/mp4">
        </video>
        <div class="mask"></div>
        <div class="inner">
            <div class="brand">
                <a href="/${language === 'en' ? '' : language}">${translateInfo.title}</a>
            </div>
            <div class="headerTitle">
                <div dir="ltr" class="text">@sumor/${pkg}</div>
                <div class="dropdown">
                    <div class="dropdownButton">
                    v${version}
                    <div class="dropdownList">
                        ${versionList}
                    </div>
                    </div>
                </div>
            </div>
            <div class="languages">
                ${languageButtons}
            </div>
        </div>
    </div>
    <div class="body">
        ${html}
    </div>
    <script>
    var setDark = function(dark){
        var highlight = document.querySelector('link[href*="highlight.js"]');
        if(dark){
            document.body.classList.add('dark')
            if(highlight&&!highlight.href.includes('github-dark')){
                highlight.href = highlight.href.replace('github', 'github-dark')
            }
        }else{
            document.body.classList.remove('dark')
            if(highlight&&highlight.href.includes('github-dark')){
                highlight.href = highlight.href.replace('github-dark', 'github')
            }
        }
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDark(true)
    }else{
        setDark(false)
    }
    </script>
</body>
</html>`
}
