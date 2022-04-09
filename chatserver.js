const express=require('express')
const app=express()
const http=require('http')
const socketio=require('socket.io')
const { Socket } = require('dgram')
const server=http.createServer(app)
const io=socketio(server)

app.use('/',express.static(__dirname+'/chatpub'))

let users={        //let a={} it means a is an object
shashank:'12345',
}

io.on('connection',(socket)=>{
    console.log(socket.id)
// socket.on('sendmsg',(data)=>{
//     io.emit('msgrcv',data)
    
// })
function log(s,u){
    s.join(u)
    s.emit('loggedin')
    // socketMap[s.id]=u
    // console.log(socketMap)
}
socket.on('login',(data)=>{
    if(users[data.username]){
        if(users[data.username]==data.password){
            // socket.join(data.username)
            // socket.emit('loggedin')    
            log(socket,data.username)
        }else{
            socket.emit('fail')
        }

    }else{
        users[data.username]=data.password
        // socket.join(data.username)
        // socket.emit('loggedin')
        log(socket,data.username)
    }
  
})
socket.on('msgsend',(data)=>{
    //data.from=socketMap[socket.id]
    if(data.to){
        io.to(data.to).emit('msgrcved',data)
    }else{
        socket.broadcast.emit('msgrcved',data)
    }
})
})
server.listen(4444,()=>{
console.log('server listening at http://localhost:4444')
})