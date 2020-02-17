const socket = io()

const form = document.querySelector("#message-form")

const location = document.querySelector("#location")

socket.on("message", (message) => {
  console.log(message)
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
  let message = e.target.elements.message.value
  socket.emit("sendMessage", message)
  message = ""
})

location.addEventListener("click", (e) => {
  e.preventDefault()
  if(!navigator.geolocation) {
    return alert("Your browser does not support geolocation")
  }
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position)
  })
})


