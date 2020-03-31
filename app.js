/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// DATA
let scores = [0, 0];
let roundScore = 0;
let activePlayer = 0;
let gameOver = false;

let randomDice;
let dice = document.querySelector(".dice");

//Hide dice on page load
dice.style.display = "none";


document.querySelector(".btn-roll").addEventListener('click', function () {

    if (gameOver === false) {

        //Random number
        randomDice = Math.floor(Math.random() * 6 + 1);

        //Display the result
        dice.style.display = "inline-block";
        dice.src = "images/dice-" + randomDice + ".png"

        //Edit score
        if (randomDice == 1) {
            nextPlayer();
        } else {
            roundScore += randomDice;
        }

        editScore();
    }
});


document.querySelector(".btn-hold").addEventListener("click", function () {

    if (gameOver === false) {

        //Add current score to global
        scores[activePlayer] += roundScore;

        //Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check win
        if (scores[activePlayer] >= 10) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner";
            dice.style.display = "none";
            gameOver = true;
        } else {

            //Next Player
            nextPlayer();
        }
    }
});

//Functions
function editScore() {
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
}

function nextPlayer() {
    roundScore = 0;
    editScore();
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
}