let socket=io()
// let inpmsg=document.getElementById('inpmsg')
// let btnsend=document.getElementById('btnsend')
// let ulmsg=document.getElementById('ulmsg')

// btnsend.onclick=function (){
//     console.log('hehe3')
// socket.emit('sendmsg',{
//     msg:inpmsg.value,
    
// })
// inpmsg.value=''
// }
// socket.on('msgrcv',(data)=>{
//     console.log('hehe1')
//     let limsg=document.createElement('li')
//     limsg.innerText=data.msg
//     ulmsg.appendChild(limsg)
//     console.log('hehe2')
// })
$(document).ready(function(){
$('#loginbox').show()
$('#chatbox').hide()
$('#btnuname').click(()=>{
socket.emit('login',{
    username:$('#uname').val(),
    password:$('#pass').val()
})
})
socket.on('loggedin',()=>{
    $('#loginbox').hide()
    $('#chatbox').show()
    
})
$('#btnsend').click(()=>{
    socket.emit('msgsend',{
        to:$('#touser').val(),
        msg:$('#inpmsg').val(),
        from:$('#uname').val()
    })
})
socket.on('msgrcved',(data)=>{
// let lim=document.createElement('li')
// lim.innerText=data.msg

//$('#ulmsg').append($('<li>').text(data.from+' -'+data.msg)) 
$('#ulmsg').append($('<li>').text(`[${data.from}] : ${data.msg}` ))
})
socket.on('fail',()=>{
    window.alert('Username or Password is incorrect')
})

    
})