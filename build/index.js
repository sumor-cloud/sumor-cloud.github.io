import fse from 'fs-extra'

// const languageList = ['en', 'es', 'fr', 'de', 'it', 'ja', 'ko', 'nl', 'pt', 'ru', 'zh'];

const output = `${process.cwd()}/output`
await fse.ensureDir(output)
await fse.writeFile(`${output}/index.html`, `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sumor Cloud Frameworks</title>
</head>
<body>
    <h1>Sumor Cloud Frameworks</h1>
    <p>Sumor Cloud Frameworks is a collection of cloud computing frameworks.</p>
    
    <p>Website is currently under construction and will be launched soon!</p>
</body>
</html>`)
