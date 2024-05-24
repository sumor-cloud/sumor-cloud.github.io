import express from 'express'
import serveStatic from 'serve-static'

const app = express()

app.use(serveStatic('output/web', { index: ['index.html'] }))
app.listen(3000)
console.log('http://localhost:3000')
