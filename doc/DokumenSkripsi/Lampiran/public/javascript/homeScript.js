var bg = $(".stage-area");

var titleHtml = $("#homePage").html();
bg.html(titleHtml);

function startClicked(){
  var syncHtml = $("#syncPage").html();
  bg.html(syncHtml);
}

function joinClicked(){
  var mobileHtml = $("#mobilePage").html();
  bg.html(mobileHtml);
}
