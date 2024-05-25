export default ({
  language,
  title,
  description,
  readyToGO,
  moreFrameworks,
  languages,
  statusHtml
}) => {
  const languageButtons = languages.map(({ key, value }) => {
    if (key === 'en') {
      return `<a href="/">${value}</a>`
    } else {
      return `<a href="/${key}">${value}</a>`
    }
  }).join(' | ')
  let cloudAppUrl = `/${language}/cloud-app`
  if (language === 'en') {
    cloudAppUrl = '/cloud-app'
  }
  return `<!DOCTYPE html>
<html lang="${language}">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    
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
    
    <link rel="stylesheet" href="/styles/index.css">
</head>
<body>
      <div class="cover">
        <div class="mask"></div>
        <div class="inner">
          <div class="title text-gradient">${title}</div>
          <div class="desc">${description}</div>
          <a class="button" href="${cloudAppUrl}">${readyToGO}</a>
          
        <div class="languages">
            ${languageButtons}
        </div>
        <div class="more">${moreFrameworks}</div>
        </div>
      </div>
    <div class="body">
        <div>
            ${statusHtml}
        </div>
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
