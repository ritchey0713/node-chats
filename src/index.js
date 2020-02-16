const path = require("path")
const express = require('express')
const http = require('http')
const socketio = require("socket.io")

const app = express()
// create server to pass to socketio
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

const dirPath = path.join(__dirname, '../public')

app.use(express.static(dirPath))

let count = 0

io.on("connection", (socket) => {
  console.log("New web socket connection")

  socket.emit("countUpdated", count)
})


server.listen(port, () => {
  console.log(`Server loaded at ${port}`)
})