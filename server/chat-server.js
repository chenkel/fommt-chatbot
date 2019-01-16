const io = require('socket.io')(3010)

let users = []
io.on('connection', function (socket) {
  console.log('A user connected')
  let username = ''
  socket.on('setUsername', function (data) {
    console.log(data, ' setUsername')
    username = data

    if (users.indexOf(data) > -1) {
      socket.emit('userExists', data + ' username is taken! Try some other username.')
      console.log('user exists')
    } else {
      console.log('user is new')
      users.push(data)
      socket.emit('userSet', { username: data })
    }
  })

  socket.on('disconnect', function (data) {
    console.log(data, ' disconnected ', username)
    users = arrayRemove(users, username)
  })

  socket.on('msg', function (data) {
    // Send message to everyone
    console.log(data, 'new message')
    io.sockets.emit('newMsg', data)
  })
})

function arrayRemove (arr, value) {
  return arr.filter(function (ele) {
    return ele !== value
  })
}
