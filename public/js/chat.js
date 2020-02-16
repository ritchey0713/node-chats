const socket = io()

const form = document.querySelector("form")

socket.on("welcomeMessage", (message) => {
  console.log(message)
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const message = e.target.elements.chatBox.value
  socket.emit("sendMessage", message)
})

socket.on("sendMessage", (message) => {
  console.log("New message:", message)
})
