var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;
var clickCount = 0;

//Coloca um event listener em cada botão
$(".btn").click(function () {
    if(gameStarted === true){
        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        clickCount++;
        checkAnswer();
    }
});

$(document).on("keydown", function () {
    if(gameStarted === false){
        gameStarted = true;
        clickCount = 0;
        nextSequence();
    }
});

//Defina aleatoriamente a próxima cor
function nextSequence() {
    level++;
    clickCount = 0;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4); //Cria um número aleatório entre 0 e 3
    var randomChosenColour = buttonColours[randomNumber]; //Guarda associa esse número a uma cor
    gamePattern.push(randomChosenColour); //Guarda num array, esse será o padrão do jogo
    
    $("#" + randomChosenColour).fadeOut(50).fadeIn(); //Animação de Flash (piscar)
    playSound(randomChosenColour);
}

//Toca a música de acordo com a cor
function playSound(chosenColor) {
    var audio = new Audio("sounds/" + chosenColor + ".mp3"); // Toca um aúdio específico para cada cor
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function (){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(){
    if(userClickedPattern[clickCount-1] === gamePattern[clickCount - 1]){ //Verifica se a cor clicada é a correta
        if(clickCount === level){
            userClickedPattern = [];
            setTimeout(function () {
                nextSequence();    
            }, 1000);
        }
    }
    else{
        playSound("wrong"); //Toca o aúdio de erro
        
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200); //Faz a tela piscar vermelha

        $("#level-title").text("Game Over, Press Any Key to Restart"); //Muda o título para game-over

        startOver();//Reseta o jogo
    }
}

function startOver() {
    gameStarted = false; //Muda para false para poder reiniciar o jogo;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}
