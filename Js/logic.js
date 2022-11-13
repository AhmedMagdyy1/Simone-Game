// ------------ana 3ndy hagten

// 1-user action
// 2- game action

// awel haga ana 3ayz lma ados 3ala ay zorar fe safha ybd2 al l3b
// $(document).keypress(function () {
//     if contion lo habd2 le3b ao hfdl msh h3ml haga------ akon 3amel let started = false
//     if(!started){
//     hashel al klam fe h1 w a5leh ybd2 b level
//     $(#level-title).html('level'+level)--------akon 3amel let level = 0
//     nextLevel()
// }

// });

// game action

let ButtonColArr = ["red", "blue", "green", "yellow"];
let gameArr = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").html("Level " + level);
    nextLevel();
    started = true;
  }
});

$(".btn").click(function () {
  var randomChosenColor = $(this).attr("id");
  userClickedPattern.push(randomChosenColor);
  console.log(userClickedPattern);
  playAudio(randomChosenColor);
  animatePress(randomChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gameArr[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gameArr.length) {
      setTimeout(function () {
        nextLevel();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playAudio("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextLevel() {
  // empty array when start the next level
  userClickedPattern = [];
  level++;
  $("#level-title").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = ButtonColArr[randomNumber];
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  gameArr.push(randomChosenColor);
  animatePress(randomChosenColor);
  playAudio(randomChosenColor);
}

// to play sound when click on any color
function playAudio(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// to make animation when click and remove with set time out
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
