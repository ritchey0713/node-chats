const users = []

//add a user 
const addUser = ({ id, username, room }) => {
  // clean data 
  username = username.trim().toLowerCase()
  room = room.trim().toLowerCase()

  //validate data 
  if(!username || !room) {
    return {
      error: "Username and room are required!"
    }
  }

  // check for existing username 
  const existingUser = users.find((user) => {
    return user.username === username && user.room === room
  })

  //validate username
  if(existingUser) {
    return {
      error: "Username for this room is taken!"
    }
  }

  //store user 
  const user = { id, username, room }
  users.push(user)
  return { user }
}



//remove a user 
const removeUser = (id) => {
  const index = users.findIndex((user) => {
    return user.id === id 
  })

  if(index !== -1) {
    return users.splice(index, 1)[0]
  }
}

// addUser({
//   id: 22,
//   username: "Sally       ",
//   room: "test room"
// })

// console.log(users)

// const res = addUser({
//   id: 20,
//   username: "Sally",
//   room: "test room"
// })

// console.log(res)

// const removedUser = removeUser(22)

// console.log(removedUser)
// console.log(users)

// get a user 



//get users in a room 