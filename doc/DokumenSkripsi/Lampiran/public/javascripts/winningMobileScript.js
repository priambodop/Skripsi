var game_over = document.getElementById('gameOver');

socket.on('getTheWinner', function(msg){
  showGameOver(msg.playerWin);
});

socket.on('backHome', function(msg){
  backToHome();
});

function showGameOver(winner){
  gameOver.innerHTML = '<p>GAME OVER</p>';
}

function backToHome(){
  var homePage = $("#homePage").html();
  bg.html(homePage);
}
