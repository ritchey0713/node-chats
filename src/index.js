const path = require("path")
const express = require('express')
const app = express()

const port = process.env.PORT || 3000

const dirPath = path.join(__dirname, '../public')

app.use(express.static(dirPath))

app.listen(port, () => {
  console.log(`Server loaded at ${port}`)
})