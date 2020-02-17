const path = require("path")
const express = require('express')
const http = require('http')
const socketio = require("socket.io")
const Filter = require("bad-words")
const { generateMessage } = require("./utils/messages")

const app = express()
// create server to pass to socketio
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

const dirPath = path.join(__dirname, '../public')

app.use(express.static(dirPath))

// use to connect only
io.on("connection", (socket) => {
  console.log("New web socket connection")

  // send to specific socket
  socket.emit("message", generateMessage("Welcome!"))
  // send to all but specific connection
  socket.broadcast.emit("message", generateMessage("A new user has joined!"))

  socket.on("sendMessage", (message, callback) => {
    //check for profanity 
    const filter = new Filter()
    if(filter.isProfane(message)) {
      return callback("Profanity is not allowed")
    }

    // send to all connected
    io.emit("message", generateMessage(message))
    callback()
  })

  socket.on("sendLocation", (location, callback) => {
    if(!location) {
      return callback("Unable to find location")
    }
    
    io.emit("locationMessage", `https://google.com/maps?q=${location.latitude},${location.longitude}`)
    callback()
  })

  // for disconnection
  socket.on('disconnect', () => {
    io.emit("message", generateMessage("A user has left!"))
  })

})


server.listen(port, () => {
  console.log(`Server loaded at ${port}`)
})