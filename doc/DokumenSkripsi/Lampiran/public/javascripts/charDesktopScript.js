var marker = 0;
var playerData = [];
var timeoutID;

var imageArray = [];
imageArray.push('<img src="images/BrocoDude.png" alt="finger">');
imageArray.push('<img src="images/DabuDonut.png" alt="finger">');
imageArray.push('<img src="images/GrapeYoda.png" alt="finger">');
imageArray.push('<img src="images/SummerEgg.png" alt="finger">');

//When a client is selecting a char on mobile page,
//The choosen character is shown.
socket.on('charSelecting', function(msg){
  if (msg.id === players[0].id) {
    var imagep1 = document.getElementById("image_1_char");
    if (msg.val == 1) {
      imagep1.innerHTML = imageArray[msg.val - 1];
    }else if (msg.val == 2) {
      imagep1.innerHTML = imageArray[msg.val - 1];
    }else if (msg.val == 3) {
      imagep1.innerHTML = imageArray[msg.val - 1];
    }else{
      imagep1.innerHTML = imageArray[msg.val - 1];
    }
  }else{
    var imagep2 = document.getElementById("image_2_char");
    if (msg.val == 1) {
      imagep2.innerHTML = imageArray[msg.val - 1];
    }else if (msg.val == 2) {
      imagep2.innerHTML = imageArray[msg.val - 1];
    }else if (msg.val == 3) {
      imagep2.innerHTML = imageArray[msg.val - 1];
    }else{
      imagep2.innerHTML = imageArray[msg.val - 1];
    }
  }
});

socket.on('playerDisconnected', function(playerId){
  if(!alert('Oh no, player has been disconnected! Find your partner to continue!')){
    window.location.href = "/";
  }
});

socket.on('charSent', function(msg){
  marker = marker + msg.marker;
  console.log(`This is marker: ${marker}`);

  if (msg.id === players[0].id) {
    var play1 = document.getElementById("char_1_name");
    var playerData1 = {
      playerId: msg.id,
      charValue: msg.val
    };
    playerData[0] = playerData1;
    if (msg.val == 1) {
      play1.innerHTML = 'Broco Dude';
    }else if (msg.val == 2) {
      play1.innerHTML = 'Dabu Donut';
    }else if (msg.val == 3) {
      play1.innerHTML = 'Grape Yoda';
    }else{
      play1.innerHTML = 'Summer Egg';
    }
  }else {
    var play2 = document.getElementById("char_2_name");
    var playerData2 = {
      playerId: msg.id,
      charValue: msg.val
    };
    playerData[1] = playerData2;
    if (msg.val == 1) {
      play2.innerHTML = 'Broco Dude';
    }else if (msg.val == 2) {
      play2.innerHTML = 'Dabu Donut';
    }else if (msg.val == 3) {
      play2.innerHTML = 'Grape Yoda';
    }else{
      play2.innerHTML = 'Summer Egg';
    }
  }

  if (marker == 2) {
    marker = 0;
    beginWaiting(1);
  }
});

function beginWaiting(beginCounter){
  var timer = setInterval(waitingToCall, 1000);

  function waitingToCall(){
    if (beginCounter >= 1) {
      beginCounter -= 1;
    }else{
      clearInterval(timer);
      toGamePlayDesktop();
    }
  }
}

function toGamePlayDesktop(){
  var gamePlayDesktop = $("#gamePlayDesktop").html();
  bg.html(gamePlayDesktop);
  socket.emit('charIsReady', playerData);
}
