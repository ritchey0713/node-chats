const socket = io() 

socket.on("countUpdated", (count) => {
  console.log("The count has been updated", count)
})

const increment = document.querySelector("#increment")

increment.addEventListener("click", () => {
  console.log("clicked")
  socket.emit("increment")
})