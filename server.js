import express from 'express'
import path from 'path'
const app = express()

app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})

app.get('/template', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/assets/data.xlsx'))
})

const PORT = 4200

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`)
})
