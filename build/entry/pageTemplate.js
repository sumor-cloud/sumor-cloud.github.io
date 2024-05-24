export default ({
  language,
  title,
  description,
  readyToGO,
  moreFrameworks,
  languages,
  statusHtml
}) => {
  const languageDialog = languages.map(({ key, value }) => {
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
    <link rel="stylesheet" href="/styles/index.css">
</head>
<body>
      <div class="homeCover">
        <div class="bgMask"></div>
        <div class="homeCoverContent">
          <div class="title text-gradient">${title}</div>
          <div class="desc">${description}</div>
          <a class="button" href="${cloudAppUrl}">${readyToGO}</a>
          
        <div class="languagesDialog">
            ${languageDialog}
        </div>
        <div class="moreFrameworks">${moreFrameworks}</div>
        </div>
      </div>
    <div class="body">
        <div class="status">
            ${statusHtml}
        </div>
    </div>
</body>
</html>`
}
