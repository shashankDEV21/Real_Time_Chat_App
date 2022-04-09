let socket=io()
const vidgrid=document.getElementById('video-grid')
const mypeer=new Peer(undefined,{
    host:'/',
    port:3001
})
const peers={}
const myvideo=document.createElement('video')
myvideo.muted=true

$(document).ready(function(){
$('#loginbox').show()
$('#chatbox').hide()
$('#getroom').hide()
$('#btnuname').click(()=>{
socket.emit('login',{
    username:$('#uname').val(),
    password:$('#pass').val()
})
})
socket.on('loggedin',()=>{
    $('#loginbox').hide()
    $('#chatbox').show()
    $('getroom').show()
    
})
$('#btnsend').click(()=>{
   
    socket.emit('msgsend',{
        to:$('#touser').val(),
        msg:$('#inpmsg').val(),
        from:$('#uname').val()
    })
})
$('#vdosend').click(()=>{
   // $('#form1').hide()
    navigator.mediaDevices.getUserMedia({
        audio:true,
        video:true
      }).then(stream=>{
        addVideoStream(myvideo,stream)
        
        mypeer.on('call',call=>{
          call.answer(stream)
          const vid=document.createElement('video')
          call.on('stream',userVideoStream=>{
            addVideoStream(vid,userVideoStream)
          })
        })
     
        socket.on('user-connected', userId => {
            connectednewUser(userId,stream)
            })
        })
        mypeer.on('open',id=>{
            socket.emit('join-room',ROOM_CODE,id)
        })
        function connectednewUser(userId,stream){
            const call=mypeer.call(userId,stream)
            const video=document.createElement('video')
            call.on('stream',userVideoStream=>{
              addVideoStream(video,userVideoStream)
            })
            call.on('close',()=>{
              video.remove()
            })
        }
        function addVideoStream(myvideo,stream){
            myvideo.srcObject=stream
            myvideo.addEventListener('loadedmetadata',()=>{
              myvideo.play()
            })
            vidgrid.append(myvideo)
          }
            

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