const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const PORT = 4100

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`)
})
