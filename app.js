/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* Challenge 3 
Add another dice to the game, so that there are two dices now. 
*/

//Data
let scores = [0, 0];
let roundScore = 0;
let activePlayer = 0;
let gameOver = false;

let randomDiceOne;
let randomDiceTwo;
let diceOne = document.querySelector(".dice-one");
let diceTwo = document.querySelector(".dice-two");

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

function reset() {
    gameOver = false;
    scores[0] = 0;
    scores[1] = 0;
    activePlayer = 0;
    nextPlayer();
    document.querySelector("#score-0").textContent = 0;
    document.querySelector("#score-1").textContent = 0;
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
}

//Hide dice on page load
diceOne.style.display = "none";
diceTwo.style.display = "none";


document.querySelector(".btn-roll").addEventListener('click', function () {

    if (gameOver === false) {

        //Random number
        randomDiceOne = Math.floor(Math.random() * 6 + 1);
        randomDiceTwo = Math.floor(Math.random() * 6 + 1);

        //Display the result
        diceOne.style.display = "inline-block";
        diceTwo.style.display = "inline-block";
        diceOne.src = "images/dice-" + randomDiceOne + ".png"
        diceTwo.src = "images/dice-" + randomDiceTwo + ".png"

        //Edit score
        if (randomDiceOne == 1 || randomDiceTwo == 1) {
            nextPlayer();
        } else {
            roundScore += (randomDiceOne + randomDiceTwo);
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
        if (scores[activePlayer] >= 25) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner";
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            diceOne.style.display = "none";
            diceTwo.style.display = "none";
            gameOver = true;
        } else {

            //Next Player
            nextPlayer();
        }
    }
});

document.querySelector(".btn-new").addEventListener("click", function () {
    reset();
});

