const username = 'Christopher Hen'

// Edit this function to change what the ChatBot says
function getChatBotResponse (data) {
  let lastUserMessage = data.message // stores the last message in variable
  let botMessage = '' // the default ChatBot response

  // Simple matching to greet others
  if (lastUserMessage === 'hi') {
    botMessage = 'Hey there! <img src="https://media.giphy.com/media/400He9KsCbdgYt2N7N/giphy.gif" alt="gif">'
  }

  // In case an adequate response was found mark it with the a bot signature
  if (botMessage !== '') {
    botMessage = botMessage + ' [b]'
  }
  return botMessage
}

// //////////////////////////////////////////////
// DO NOT CHANGE BELOW OR THINGS ARE BREAKING //
// ////////////////////////////////////////////
/* global io */
const socket = io('http://chat.espebo.com')

let user

socket.emit('setUsername', username)

socket.on('userExists', function (data) {
  document.getElementById('b').hidden = true
  document.getElementById('m').setAttribute('value', data)
})

socket.on('userSet', function (data) {
  user = data.username
  document.getElementById('b').hidden = false
  document.getElementById('m').textContent = ''
})

socket.on('newMsg', function (data) {
  if (user) {
    $('#messages').append($('<li>').html(' <b>' + data.user + '</b> <small>(' + data.time + ')</small></br>' +
      data.message))
    console.log(data)
    if (data && data.user !== username) {
      const botAnswer = getChatBotResponse(data)
      if (botAnswer && botAnswer !== data.message) {
        socket.emit('msg', { message: botAnswer, user: user, time: new Date().toLocaleTimeString() })
      }
    }
    $('html, body').scrollTop($(document).height())
  }
})

$(document).ready(function () {
  $('form').submit(function (e) {
    e.preventDefault() // prevents page reloading
    const messageJQ = $('#m')
    const msg = messageJQ.val()
    if (msg) {
      socket.emit('msg', { message: msg, user: user, time: new Date().toLocaleTimeString() })
    }
    messageJQ.val('')
    return false
  })
})
