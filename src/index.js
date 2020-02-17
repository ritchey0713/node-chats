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


io.on("connection", (socket) => {
  console.log("New web socket connection")

  // send to specific socket
  socket.emit("message", "Hello welcome to chat app!")
  // send to all but specific connection
  socket.broadcast.emit("message", "A new user has joined!")

  socket.on("sendMessage", (message) => {
    
    // send to all connected
    io.emit("message", message)
  })

})


server.listen(port, () => {
  console.log(`Server loaded at ${port}`)
})