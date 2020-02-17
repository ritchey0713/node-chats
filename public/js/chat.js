const socket = io()

const form = document.querySelector("#message-form")

const userLocation = document.querySelector("#location")

socket.on("message", (message) => {
  console.log(message)
})

socket.on("sendLocation", (location) => {
  console.log(location)
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
  let message = e.target.elements.message.value
  socket.emit("sendMessage", message)
  message = ""
})

userLocation.addEventListener("click", (e) => {
  e.preventDefault()
  if(!navigator.geolocation) {
    return alert("Your browser does not support geolocation")
  }
  navigator.geolocation.getCurrentPosition((position) => {
    let sendLocation = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
    
    socket.emit("sendLocation", sendLocation)
  })
})




