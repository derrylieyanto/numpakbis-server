const app = require('express')()
const http = require('http').createServer(app)


app.get('/', (req, res) => {
    res.send("Node Server Numpakbis is running. Yay!!")
})

//Socket Logic
const socketio = require('socket.io')(http)

socketio.on("connection", (userSocket) => {
    userSocket.on("send_message", (data,sender) => {
	let  message = {"message":data, "sender":sender}
        userSocket.broadcast.emit("receive_message", message)
    })
})

http.listen(process.env.PORT)