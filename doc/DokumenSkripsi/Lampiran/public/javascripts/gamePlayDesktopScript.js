var canvas = document.getElementById('canvasGpDesktop');
var ctx = canvas.getContext('2d');
var ctx2 = canvas.getContext('2d');

var track = new Image();
var timer1 = new Image();
var timer2 = new Image();
var timer3 = new Image();

var player1Char = new Image();
var player2Char = new Image();

var dataOfPlayer;

var player1Val = 0;
var player2Val = 0;

var timerArray = [];
var charArray = [];

var arrOfPlayerChar = [2];

var aniFrame;
var aniFrame2;
var progressPlayer1 = 0;
var progressPlayer2 = 0;
var xPosition1 = 100;
var yPosition1 = 340;
var xPosition2 = 90;
var yPosition2 = 400;

var counterLatencyP1 = 0;
var counterLatencyP2 = 0;
var totalLatencyP1 = 0;
var totalLatencyP2 = 0;

timer1.src = 'images/timer1.png';
timer2.src = 'images/timer2.png';
timer3.src = 'images/timer3.png';

charArray.push('images/brocoDudeTiny.png');
charArray.push('images/dabuDonutTiny.png');
charArray.push('images/grapeYodaTiny.png');
charArray.push('images/summerEggTiny.png');

timerArray.push(timer1);
timerArray.push(timer2);
timerArray.push(timer3);

socket.on('moveThePlayer', function(msg){
  if (msg === dataOfPlayer[0].playerId) {
    socket.on('pong', function(startTime){
      var times = new Date();
      var currentTime = times.getMilliseconds();
      var latency = currentTime - startTime;
      totalLatencyP1 += latency;
      counterLatencyP1 += 1;
    });

    readyPlayerOne();
  }else {
    socket.on('pong', function(startTime){
      var times = new Date();
      var currentTime = times.getMilliseconds();
      var latency = currentTime - startTime;
      totalLatencyP2 += latency;
      counterLatencyP2 += 1;
    });
    readyPlayerTwo();
  }
});

socket.on('playerDisconnected', function(playerId){
  if(!alert('Oh no, player has been disconnected! Find your partner to continue!')){
    window.location.href = "/";
  }
});

socket.on('startTheGame', function(msg){
  init();
  beginCountDown(3, msg);
});

socket.on('toWinnerPage', function(msg){
  toWinningPage();
});

function init(){
  track.src = 'images/track.png';
  track.onload = function(){
    ctx.drawImage(track, 0, 0);
  }
}

function beginCountDown(beginCounter, msg){
  var counter = beginCounter - 1;
  console.log(`before showCountDown: ${counter}`);
  var timer = setInterval(showCountDown, 1000);

  function showCountDown(){
    if (beginCounter >= 1) {
      ctx.drawImage(timerArray[counter], 330, 150);
      beginCounter -= 1;
      counter -= 1;
      console.log(`after showCountDown: ${counter}`);
    }else{
      clearInterval(timer);
      drawChar(msg);
      beginGamePlay();
    }
  }
}

function drawChar(data){
  player1Val = data[0].charValue;
  player2Val = data[1].charValue;

  console.log(`this is player1Val : ${player1Val}`);
  console.log(`this is player2Val : ${player2Val}`);

  player1Char.src = charArray[player1Val - 1];
  player2Char.src = charArray[player2Val - 1];

  arrOfPlayerChar[0] = player1Char;
  arrOfPlayerChar[1] = player2Char;
}

function beginGamePlay(){
  readyPlayerOne();
  readyPlayerTwo();
}

function reachFinishLine(player){
  socket.emit('sendingTheWinner',{
    playerWin: player,
    playerCharArr: arrOfPlayerChar,
    winnerId: dataOfPlayer[player-1].playerId
  });
}

function toWinningPage(){
  var winDesktop = $('#winningDesktop').html();
  bg.html(winDesktop);
}

function readyPlayerOne(){
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, 900, 600);

    ctx.save();
    console.log('lets draw player 1');

    progressPlayer1 += 1;
    if ( xPosition1 < 680 && yPosition1 == 340 ) {
      //BOTTOM ROW
      console.log('bottom Row');
      ctx.save();
      xPosition1 += 0.5;
      ctx.drawImage(player2Char, xPosition2, yPosition2);
      ctx.drawImage(player1Char, xPosition1, yPosition1);
      ctx.restore();
    }else if(yPosition1 > 250){
      console.log('right curve');
       // RIGHT CURVE
      ctx.save();

      if(yPosition1 > 300) {
        xPosition1 += 0.2;
        yPosition1 -= 0.5;
      }else{
        xPosition1 -= 0.3;
        yPosition1 -= 0.5;
      }

      ctx.drawImage(player1Char, xPosition1, yPosition1);
      ctx.drawImage(player2Char, xPosition2, yPosition2);
      ctx.restore();

    }else if(xPosition1 > 150 && yPosition1 >= 250){
      console.log('middle row');
      // MIDDLE ROW
      xPosition1 -= 0.5;
      ctx.save();

      ctx.drawImage(player1Char, xPosition1, yPosition1);
      ctx.drawImage(player2Char, xPosition2, yPosition2);
      ctx.restore();
    }else if(xPosition1 < 680 && yPosition1 >= 10){
      // LEFT CURVE
      console.log('left curve');
      ctx.save();

      if(yPosition1 > 120) {
        if (yPosition1 > 160) {
          xPosition1 -= 0.7;
          yPosition1 -= 0.6;
        }else {
          yPosition1 -= 0.5;
        }
      }else{
        xPosition1 += 0.5;
        yPosition1 -= 0.7;
      }

      ctx.drawImage(player2Char, xPosition2, yPosition2);
      ctx.drawImage(player1Char, xPosition1, yPosition1);
      ctx.restore();
    }else if(xPosition1 < 700 && yPosition1 >= 8){
      //TOP ROW
      console.log('top row');
      ctx.save();
      xPosition1 += 0.5;
      ctx.drawImage(player2Char, xPosition2, yPosition2);
      ctx.drawImage(player1Char, xPosition1, yPosition1);
      ctx.restore();
    }else {
      reachFinishLine(1);
      ctx.drawImage(player2Char, xPosition2, yPosition2);
      ctx.drawImage(player1Char, xPosition1, yPosition1);
    }

    ctx.restore();

    ctx.drawImage(track, 0, 0);

    if (progressPlayer1 < 40) {
      console.log(`progressPlayer1: ${progressPlayer1}`);
      aniFrame = requestAnimationFrame(readyPlayerOne);
    }
    else {
      progressPlayer1 = 0;
    }
}
// USE ARRAY FOR PLAYER AND CHARACTER

function readyPlayerTwo(){
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, 900, 600);

  ctx.save();
  progressPlayer2 += 1;

  if (xPosition2 < 680 && yPosition2 == 400 ) {
    console.log('bottom Row 2');
    xPosition2 += 0.5;
    ctx.drawImage(player2Char, xPosition2, yPosition2);
    ctx.drawImage(player1Char, xPosition1, yPosition1);
  }else if(yPosition2 > 190){
    console.log('right curve 2');
     // RIGHT CURVE
    ctx.save();
    if(yPosition2 > 250) {
      if (yPosition2 > 340) {
        xPosition2 += 0.7;
        yPosition2 -= 0.6;
      }else {
        yPosition2 -= 0.5;
      }
    }else{
      xPosition2 -= 0.5;
      yPosition2 -= 0.7;
    }

    ctx.drawImage(player2Char, xPosition2, yPosition2);
    ctx.drawImage(player1Char, xPosition1, yPosition1);

    ctx.restore();

  }else if(xPosition2 > 150 && yPosition2 >= 180){
    console.log('middle row 2');
    // MIDDLE ROW

    xPosition2 -= 0.5;
    ctx.save();

    ctx.drawImage(player1Char, xPosition1, yPosition1);
    ctx.drawImage(player2Char, xPosition2, yPosition2);
    ctx.restore();
  }else if(xPosition2 < 680 && yPosition2 >= 70){
    // LEFT CURVE
    console.log('left curve 2');

    ctx.save();

    if(yPosition2 > 100) {
      xPosition2 -= 0.2;
      yPosition2 -= 0.5;
    }else{
      xPosition2 += 0.3;
      yPosition2 -= 0.5;
    }

    ctx.drawImage(player2Char, xPosition2, yPosition2);
    ctx.drawImage(player1Char, xPosition1, yPosition1);
    ctx.restore();
  }else if(xPosition2 < 655 && yPosition2 >= 65){
    console.log('top row 2');
    ctx.save();
    xPosition2 += 0.5;
    ctx.drawImage(player2Char, xPosition2, yPosition2);
    ctx.drawImage(player1Char, xPosition1, yPosition1);
    ctx.restore();
  }else {
    reachFinishLine(2);
    ctx.drawImage(player2Char, xPosition2, yPosition2);
    ctx.drawImage(player1Char, xPosition1, yPosition1);
  }

  ctx.restore();

  ctx.drawImage(track, 0, 0);

  if (progressPlayer2 < 40) {
    console.log(`progressPlayer2: ${progressPlayer2}`);
    aniFrame2 = requestAnimationFrame(readyPlayerTwo);
  }
  else {
    progressPlayer2 = 0;
  }
}
