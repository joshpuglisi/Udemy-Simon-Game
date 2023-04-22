var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var gamePattern = [];
var hasStarted = false;

var level = 0;

/** mouse click functionality */
$(".btn").click(function () { //dont forget to add "." for class type!!!
    var userChosenColor = $(this).attr("id"); //assign the attribute id of the clicked button to the variable
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor); //play the sound when clicked
    animatePress(userChosenColor); //animate the button when clicked
    checkAnswer(userClickedPattern.length - 1); //the parameter is the index NUMBER of the last chosen color
    console.log(userClickedPattern);
})

/**Evaluation function */
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){ //Removed gamePattern[gamePattern.length-1] because it has to be same with parameter. Else it will be buggy.
        console.log("Success");
        if(userClickedPattern.length === gamePattern.length){ //brilliantly done without peeking the solution :)
            setTimeout(function(){
                newSequence();
            }, 1000);
        }
    } else {
        console.log("Failed");

        playSound("wrong");

        $("body").addClass("game-over");
        
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200)
        $("#level-title").text("Game Over. Press A again to restart.");
        startOver();
    }
}

/**Start over function */
function startOver(){
    hasStarted = false;
    level = 0;
    gamePattern = [];
}


/**Game function */
function newSequence() {
    userClickedPattern = [];//to reset, in this case, you do not need to pop!!!
    level++;
    $("#level-title").text("Level " + level); //this will be called again after sequence is done.
    

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor); 
    console.log(gamePattern);
}

/**Sound function */
function playSound(name) {
    var playAudio = new Audio('sounds/' + name + '.mp3');
    playAudio.play();
}

/**Animate the pressing */
function animatePress(currentColor) {
    $('#' + currentColor).addClass("pressed");
    setTimeout(function(){
        $('#' + currentColor).removeClass("pressed");
    }, 100);
}

/**Keypress functionality */
$(document).keypress(function(e) {
    if(e.key === "a"){ //key to start the game
        if(!hasStarted){
            $("#level-title").text("Level " + level);
            newSequence();
            hasStarted = true;
        }
    }
    if(e.key === "q"){ //key to instantly restart the game
        $("#level-title").text("Press A Key to Start");
        $("body").addClass("back-to-menu");
        setTimeout(function() {
            $("body").removeClass("back-to-menu");
        },200);
        startOver();
    }
})

