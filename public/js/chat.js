const socket = io()

const form = document.querySelector("#message-form")
const userLocation = document.querySelector("#location")
const input = form.querySelector('input')
const formButton = form.querySelector('button')
const messages = document.querySelector("#messages")
const sideBar = document.querySelector("#sidebar")


//templates 
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector("#location-template").innerHTML
const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML

//Options 
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

const autoScroll = () => {
  // new message element 
  const newMessage = messages.lastElementChild

  // get height of new message
  const newMessageStyles = getComputedStyle(newMessage)
  const newMessageMargin = parseInt(newMessageStyles.marginBottom)
  const newMessageHeight = newMessage.offsetHeight + newMessageMargin

  //visible height
  const visibleHeight = messages.offsetHeight

  // height of messages container 
  const contentHeight = messages.scrollHeight

  // location of scroll bar 
  const scrollOffset = messages.scrollTop + visibleHeight

  if(contentHeight - newMessageHeight <= scrollOffset) {
    messages.scrollTop = messages.scrollHeight
  }
}

socket.on("message", (message) => {
  const html = Mustache.render(messageTemplate, {
    message: message.text,
    username: message.username,
    createdAt: moment(message.createdAt).format("HH:mm A")
  })
  messages.insertAdjacentHTML("beforeend", html)
  autoScroll()
})

socket.on("locationMessage", (location) => {
  const html = Mustache.render(locationTemplate, {
    location: location.text,
    username: location.username,
    createdAt: moment(location.createdAt).format("HH:MM A")
  })
  messages.insertAdjacentHTML("beforeend", html)
  autoScroll()
})

socket.on("roomData", ({room, users}) => {
  const html = Mustache.render(sidebarTemplate, {
    room,
    users
  })
  sideBar.innerHTML = html
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
  //disable form
  formButton.setAttribute('disabled', 'disabled')

  let message = e.target.elements.message.value
  socket.emit("sendMessage", message, (error) => {
    // re enable form
    formButton.removeAttribute("disabled")
    input.value = ""
    input.focus()

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
  userLocation.setAttribute("disabled", "disabled")
  navigator.geolocation.getCurrentPosition((position) => {
    let sendLocation = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
    
    socket.emit("sendLocation", sendLocation, (error) => {
      if(error) {
        return console.log(error)
      }
      userLocation.removeAttribute("disabled")
      console.log("Location shared!")
    })
  })
})

socket.emit("join", { username, room }, (error) => {
  if(error) {
    alert(error)
    location.href="/"
  }
})


