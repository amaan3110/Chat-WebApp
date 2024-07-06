// server.js
const express = require('express')
const app = express()
const http = require('http').createServer(app)

require('dotenv').config()

const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

http.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')

    socket.on('joinRoom', (roomKey) => {
        socket.join(roomKey)
    })

    socket.on('message', (msg) => {
        socket.to(msg.room).emit('message', msg)
    })
})
