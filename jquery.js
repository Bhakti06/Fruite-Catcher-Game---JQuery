var playing = false;
var score;
var trialsLeft;
var step;
var action; //used for setInterval function
var fruits = ['apple','banana','cherry','kiwi','mango','orange','strawberry'];

$(function(){
//start reset button
$('#startreset').click(function(){
//condition for we are playing
if(playing == true){
    //reload page
    location.reload();
}else{
    //we are not playing
    playing = true; // game initiated
    // set a score to 0
    score = 0 ;
    $('#scorevalue').html(score);

    //show trials left
    $("#trialsLeft").show();
    trialsLeft = 3;
    addHearts();

     //hide game over box
     $("#gameOver").hide();


    //change button text to reset game
    $("#startreset").html("Reset Game");

    //start sending fruits
    startAction();
}
});

// slice a fruite

$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score); // updated score
// slice sound

    $("#slicesound")[0].play();
  
    // stop fruit 
-  clearInterval(action);

$("#fruit1").hide("explode", 500); //slice fruit
    
//send new fruit
setTimeout(startAction, 800);

});




//functions

function addHearts(){
    $("#trialsLeft").empty();
    for(i=0; i<trialsLeft; i++){
        $("#trialsLeft").append('<img src="images/heart.png" class="life" alt=heart image">');
    }
}

function startAction(){
   
    $("#fruit1").show();
    chooseFruit(); //choose a random fruit

    $("#fruit1").css({'left':Math.round(550*Math.random()), 'top': -50});

    //random position

//generate random step
step = 1 + Math.round(5*Math.random());

    //move fruit down by one step every 10ms

    action = setInterval(function()
    {
        $("#fruit1").css('top',
        $("#fruit1").position().top + step);
    
    //check if the fruit is very low
       if($('#fruit1').position().top > $("#fruitsContainer").height()){
        //check if we have trials left 
          if(trialsLeft > 1){
            //generate a fruit
            $("#fruit1").show();
            chooseFruit(); //choose a random fruit
        
            $("#fruit1").css({'left':Math.round(550*Math.random()), 'top': -50});
        
            //random position
        
        //generate random step
        step = 1 + Math.round(5*Math.random());
        
            //reduce trails by one
            trialsLeft --;

            // populate trailsLeft box
            addHearts();

           

          } else{//game over
            playing = false; // we are not playing anymore

            $("#startReset").html("Start Game"); // change button to start game

            $("#gameOver").show();

            $("#gameOver").html('<p>Game Over!</p><p>Your Score is ' + score + '</p>');

            $("#trialsLeft").hide();

            stopAction();

        }
    }
},10);

}


//generate random fruit

function chooseFruit(){
    $("#fruit1").attr('src','images/' + fruits[Math.round(6*Math.random())] + '.png');
}

function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}

});