const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.get("/", (req, res) => {
  res.send("<h1>Chat app</h1>")
})

app.listen(port, () => {
  console.log(`Server loaded at ${port}`)
})