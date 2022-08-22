let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickerPattern = [];

let level = 0;
let gameStarted = true;

// STARTING THE GAME
$(document).on("keypress", function () {
  if (gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

$(document).on("click", function () {
  if (gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

// CLICKING THE BUTTONS
$(".btn").on("click", function () {
  let userChosenColor = $(this).attr("id");
  userClickerPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickerPattern.length - 1);
});

// NXT COLOR SEQUENCE
function nextSequence() {
  userClickerPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

// SOUND
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// CSS ANIMATE COLOR
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// CHECKING ANSWERS
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickerPattern[currentLevel]) {
    console.log("Success");

    if (userClickerPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Failure");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// RESTARTING THE GAME
function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted;
}
