const socket = io()

const submit = document.querySelector("form")

socket.on("welcomeMessage", (message) => {
  console.log(message)
})

socket.on("sendMessage", (message) => {
  console.log("New message:", message)
})

submit.addEventListener("submit", (e) => {
  e.preventDefault()
  const message = e.target.elements.chatBox.value
  socket.emit("sendMessage", message)
})