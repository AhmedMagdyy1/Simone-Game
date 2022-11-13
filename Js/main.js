let ButtonColArr = ["red", "green", "blue", "yellow"];

let gameArr = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(".btn").click(function () {
  let userColor = this.id;
  userClickedPattern.push(userColor);
  animatePress(userColor);
  playSound(userColor);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function () {
  if (!started) {
    $("#level-title").html("level" + level);
    gameAction();
    started = true;
  }
});

function gameAction() {
  userClickedPattern = [];
  level++;
  $("#level-title").html("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = ButtonColArr[randomNumber];
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  gameArr.push(randomChosenColor);
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
  if (gameArr[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gameArr.length === userClickedPattern.length) {
      setTimeout(function () {
        gameAction();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  started = false;
  gameArr = [];
}
