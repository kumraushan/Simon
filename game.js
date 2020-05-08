alert("Please Use Earphone for better Experience\n\nबेहतर अनुभव के लिए इयरफोन का उपयोग करें");

var userClickedPattern = [];

var buttonColours = ["green", "red", "yellow", "blue" ];

var gamePattern = [];

var level=0;
var score =0;
var highScore=0;

              //Generating Computer Sequence

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#levelTitle").text("Level "+level);

    var randomNumber = Math.floor((Math.random())*4);
    var randomColour = buttonColours[randomNumber];
    gamePattern.push(randomColour);
    console.log(gamePattern);

    var i = 0;
    function myLoop() {
      setTimeout(function() {
        playSound(gamePattern[i]);
        animatePress(gamePattern[i]);
        i++;
        if (i < gamePattern.length) {
          myLoop();
        }
      }, 500)
    }

    myLoop();

}

                    //To Play Sound

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

                    //Adding Animation

function animatePress(currentColour){
    $("#"+currentColour).addClass("blink");
    setTimeout(function(){
      $("#"+currentColour).removeClass("blink");
    },150);
}

                //Matching Both Sequence

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
      console.log("success");

      if(userClickedPattern.length===gamePattern.length)
      {
        setTimeout(function(){
          nextSequence();
          score++;
          $(".score").text(score);
          if(score>highScore){
            highScore++;
            $(".high_score").text(highScore);
          }
        },1000);
      }

    }
    else
    {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
          $("body").removeClass("game-over");
      },200);
      $("#levelTitle").text("Game Over");
      startOver();
    }

}

                //Starting Game

function startOver(){
  level=0;
  gamePattern=[];
}

                //Getting User Sequence

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

$("#start").click(function(){
  $(this).fadeOut(200).delay(1000);
  nextSequence();

})

            //Restart Game

$(".restart").click(function(){
  $(this).addClass("playAgain");
  setTimeout(function(){
    $(".restart").removeClass("playAgain");
  },200);
  $("#levelTitle").text("Tap play to Start the game");
  $("#start").fadeIn(150);
  score=0;
  $('.score').text(score)
});

                //Game Rules

$("#hindi").hide();
$("#change").click(function(){
  $(this).addClass("blink");
  setTimeout(function(){
    $("#change").removeClass("blink");
  },200);

  if($('#change').text()==='हिंदी में पढ़ने के लिए')
  {
    $("#english").hide();
    $("#hindi").show();
    $('#change').text('To Read in English');
    $('#rules').text('परिचय और नियम');
  }

  else{
    $("#hindi").hide();
    $("#english").show();
    $('#change').text('हिंदी में पढ़ने के लिए');
    $('#rules').text('Intro & Rules');
  }
})
