const socket = io()

const form = document.querySelector("#message-form")

socket.on("message", (message) => {
  console.log(message)
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
  let message = e.target.elements.message.value
  socket.emit("sendMessage", message)
  message = ""
})


