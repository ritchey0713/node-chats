const socket = io()

const form = document.querySelector("#message-form")

socket.on("message", (message) => {
  console.log(message)
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const message = e.target.elements.chatBox.value
  socket.emit("sendMessage", message)
})


