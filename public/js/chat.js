const socket = io()

const form = document.querySelector("#message-form")
const userLocation = document.querySelector("#location")
const input = form.querySelector('input')
const formButton = form.querySelector('button')

socket.on("message", (message) => {
  console.log(message)
})

socket.on("sendLocation", (location) => {
  console.log(location)
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
  //disable form
  formButton.setAttribute('disabled', 'disabled')

  let message = e.target.elements.message.value
  socket.emit("sendMessage", message, (error) => {
    // re enable form
    formButton.removeAttribute("disabled")

    if(error) {
      return console.log(error)
    }

    console.log("message delivered")
  })
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
    
    socket.emit("sendLocation", sendLocation, (error) => {
      if(error) {
        return console.log(error)
      }
      console.log("Location shared!")
    })
  })
})




