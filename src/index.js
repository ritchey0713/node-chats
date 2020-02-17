const path = require("path")
const express = require('express')
const http = require('http')
const socketio = require("socket.io")
const Filter = require("bad-words")
const { generateMessage } = require("./utils/messages")
const { addUser, removeUser, getUser, getRoomUsers } = require("./utils/users.js")

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
  // socket.emit("message", generateMessage("Welcome!"))
  // send to all but specific connection
  // socket.broadcast.emit("message", generateMessage("A new user has joined!"))

  socket.on("join", ({ username, room }, callback) => {
    //add user to users array
    const { error, user } = addUser({ id: socket.id, username, room })

    if(error) {
      return callback(error)
    }


    // server only, allows users to join a room
    socket.join(user.room)

    socket.emit("message", generateMessage("Welcome!"))
    
    //io.to.emit => emits event to everyone in a room
    // io.to(room).emit("message",  generateMessage("Welcome!"))
    // socket.broadcast.to.emit => sends event to everyone in room other than the client who triggered
    socket.broadcast.to(user.room).emit("message", generateMessage(`${user.username} has joined!`))

    callback()
  })

  socket.on("sendMessage", (message, callback) => {
    //check for profanity 
    const filter = new Filter()
    if(filter.isProfane(message)) {
      return callback("Profanity is not allowed")
    }
    // socket.id will point to connected user
    const user = getUser(socket.id)

    // send to all connected in room
    io.to(user.room).emit("message", generateMessage(message))
    callback()
  })

  socket.on("sendLocation", (location, callback) => {
    if(!location) {
      return callback("Unable to find location")
    }
    const user = getUser(socket.id)
    
    io.to(user.room).emit("locationMessage", generateMessage(`https://google.com/maps?q=${location.latitude},${location.longitude}`))
    callback()
  })


  // for disconnection
  socket.on('disconnect', () => {
    const user = removeUser(socket.id)
    if(user) {
      io.to(user.room).emit("message", generateMessage(`${user.username} has left!`)) 
    }
  })

})


server.listen(port, () => {
  console.log(`Server loaded at ${port}`)
})