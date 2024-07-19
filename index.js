const {createServer} = require('http')
const {Server} = require('socket.io')
const express = require('express')
const app = express()
const httpServer = createServer(app)
const socket = new Server(httpServer, {
    cors:{
        origin:'*'
    }
})


app.get('/', (req, res)=>{
    res.send('server running')
})




socket.on('connection', (socket)=> {
    console.log('client connected')
    
    socket.on('msg', (data)=>{
        const {emiter, message} = data;
        console.log(emiter)
        socket.emit('message', {
            'emiter':emiter,
            'message': message
        })
        socket.broadcast.emit('msg',{
            'emiter':emiter,
            'message': message
        })
    })
    
})


httpServer.listen(3001, ()=>{
    console.log('server connected')
})