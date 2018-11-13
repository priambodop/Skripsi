//MAKE RESPONSIVE LAYOUT !!!

var socket = io();
// var startTime;
// Socket.io Code related

socket.on('connect', function(){
  console.log('Client is connected !');
  console.log(`This is client id: ${socket.id}`);
});

//When a client successfully join the room
//The message is shown here.
socket.on('joinSucceed', function(msg){
  var messages = document.getElementById("joined");
  messages.innerHTML = msg;
  document.getElementById("requestButton").disabled = true;
});


//When the room is not exist, connection is rejected
socket.on('joinRejected', function(msg){
  var messages = document.getElementById("joined");
  messages.innerHTML = msg;
});

//When the room is full,
//Redirect to character page using toCharMobile() function
socket.on('toCharPage', function(msg){
  toCharMobile();
});

// Socket.io Code Ends Here

//Client requesting to join the room
//After entering the code and click send
function requestToJoin(){
  var codeRoom = $('#code').val();
  if (codeRoom === "") {
    alert('Enter the code from the desktop');
  }else{
    socket.emit('requestToJoin', {
      id: socket.id,
      room: $('#code').val()
    });
  }

  // $('form').submit(function(e){
  //   e.preventDefault();
  //   socket.emit('requestToJoin', {
  //     id: socket.id,
  //     room: $('#code').val()
  //   });
  // });
}

//redirecting to a charMobile page.
function toCharMobile(){
  var charMobileHtml = $("#charMobile").html();
  bg.html(charMobileHtml);
}
