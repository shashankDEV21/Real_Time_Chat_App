let socket=io()

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