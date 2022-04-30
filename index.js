var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(){
  if (!started) {
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length-1)
});







function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");

  }, 100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length===gamePattern.length) {
      setTimeout(function(){
        nextSequence();
      }, 1000)
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over")

    }, 200)

    $("#level-title").text("Game Over, Press any Key to Restart");
    console.log("fail");
    startOver();
  }
}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
