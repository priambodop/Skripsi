var stepLeftHtml = document.getElementById('stepLeft');
var instructionEl = document.getElementById('instruction');

socket.on('startTheGame', function(msg){
  showInstruction(3);
});

socket.on('toWinnerPage', function(msg){
  moveToWinPage();
});

socket.on('playerDisconnected', function(playerId){
  if(!alert('Oh no, player has been disconnected! Find your partner to continue!')){
    window.location.href = "/";
  }
});


function stepClicked(){
  socket.emit('stepClicked', {
    playerID: socket.id
  });

  var time = new Date();
  startTime = time.getMilliseconds();
  socket.emit('ping', startTime);
}

function moveToWinPage(){
  var winMobile= $('#winningMobile').html();
  bg.html(winMobile);
}


function showInstruction(beginCounter){
  instructionEl.innerHTML = 'Press left and right to move your character';

  var timer = setInterval(showText, 1000);

  function showText(){
    beginCounter -= 1;
    if (beginCounter < 1) {
      instructionEl.innerHTML = '';
      clearInterval(timer);
    }
  }
}
