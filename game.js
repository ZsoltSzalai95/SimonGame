const buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
var key_pressed = 0
var level = 0

// Gives a random sequence, updates gamePattern + Has animation for buttons + updates level.
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").html("Level " + level);
};



// Checks button clicks by user and updates userClickedPattern + Calls checkAnswer function
$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  // Bug-fix: Prevent h2 to appear before game start
  if (key_pressed !== 0) {
    $("h2").html("You have guessed "+ userClickedPattern.length + "/" + gamePattern.length);
  };
  checkAnswer();
});




//Audio blueprint
function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
};


// Adding class to elements for animation
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};



// Checks for user mistakes + adds animation
function gameOver() {
  $("h1").html("Game Over");
  $(document.body).addClass("game-over");
  setTimeout(function() {
    $(document.body).removeClass("game-over");
  }, 200);
};



//Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function(event) {
  key_pressed++;
  if (key_pressed === 1) {
    $("h1").html("Level 0");
    nextSequence()

  }
});




// After checking the length of userClickedPattern and gamePattern checks if they are identical
function checkAnswer() {
  var is_true = arrayEquals(userClickedPattern, gamePattern);
  if (userClickedPattern.length === gamePattern.length) {
    if (is_true == true) {
      setTimeout(function() {
        nextSequence();
        $("h2").html("You have guessed "+ userClickedPattern.length + "/" + gamePattern.length);
      }, 1000);
    } else {
      playSound("wrong");
      $("h2").html("Press any key to restart");
      gameOver();
      startOver();
    }
  } else {
  }
};


// Reset the game
function startOver() {
  level = 0;
  gamePattern = [];
  key_pressed = 0;
};


// Checks if gamePattern = userClickedPattern
function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
};
