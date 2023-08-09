const express = require('express')
const app = express()
const server = require('http').Server(app)

const io = require("socket.io")(server)


const {v4: uuidv4} = require('uuid')

app.set('view engine', "ejs");
app.use(express.static("public"))

//Homepage automatically redirects to a UUID eg = f04eea3c-a28c-4a14-b354-c63f40e6be74

app.get('/',(req,res)=>{
    res.redirect(`/${uuidv4()}`)
} )

//The UUID eg f04eea3c-a28c-4a14-b354-c63f40e6be74 becomes a parameter stored in roomId
app.get('/:roomid',(req,res)=>{
    res.render("room",{roomId:req.params.roomid})
})


io.on('connection',socket=>{
    socket.on('join-room',(roomId)=>{
        socket.join(roomId)
        socket.to(roomId).broadcast.emit("user-joined")
    })
})



server.listen(3030)

