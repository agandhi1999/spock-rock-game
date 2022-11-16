import { startConfetti, stopConfetti, removeConfetti } from './confetti.js';

// For Game Logic
const playerRock = document.getElementById('player-rock');
const playerPaper = document.getElementById('player-paper');
const playerScissors = document.getElementById('player-scissors');
const playerLizard = document.getElementById('player-lizard');
const playerSpock = document.getElementById('player-spock');
const computerRock = document.getElementById('computer-rock');
const computerPaper = document.getElementById('computer-paper');
const computerScissors = document.getElementById('computer-scissors');
const computerLizard = document.getElementById('computer-lizard');
const computerSpock = document.getElementById('computer-spock');
// For Message
const message = document.querySelector('h3');
// For Scores
const computerScoreEl = document.getElementById('computer-score');
const playerScoreEl = document.getElementById('player-score');
const computerHyphens = document.getElementById('computer-hyphens');
const playerHyphens = document.getElementById('player-hyphens');
const computerSelected = document.getElementById('computer-selected');
const playerSelected = document.getElementById('player-selected');
const resetIcon = document.querySelector('.fa-arrows-rotate');

const computerItems = [computerRock, computerPaper, computerScissors, computerLizard, computerSpock];
const playerItems = [playerRock, playerPaper, playerScissors, playerLizard, playerSpock];

const choices = {
    'player-rock': [computerScissors, computerLizard],
    'player-paper': [computerRock, computerSpock],
    'player-scissors': [computerPaper, computerLizard],
    'player-lizard': [computerPaper, computerSpock],
    'player-spock': [computerScissors, computerRock]
  };

// Keep Scores
let playerScore = 0;
let computerScore = 0;

function playGame(e) {
    // Reset Colors
    playerItems.map(el => el.style.removeProperty('filter'));
    computerItems.map(el => el.style.removeProperty('filter'));
    // Reset Confetti
    stopConfetti();
    removeConfetti();

    const cpuSelection = computerItems[Math.floor(Math.random()*computerItems.length)];
    
    // User Win Scenarios
    if (choices[e.target.id].indexOf(cpuSelection) > -1) {
        winFunction(e);
    } else if (e.target.classList.value === cpuSelection.classList.value) {
        // Tie Scenario
        message.textContent = 'Game Tied !'
    } else {
        message.textContent = 'You Lose !'
        computerScore++;
        computerScoreEl.textContent = computerScore;
    }

    // Update CSS & HTML
    e.target.style.filter = 'brightness(0)';
    cpuSelection.style.filter = 'brightness(0)';
    playerHyphens.hidden = false;
    computerHyphens.hidden = false;
    playerSelected.hidden = false;
    computerSelected.hidden = false;

    // Update Item chosen by user
    switch (playerItems.indexOf(e.target)) {
        case 0:
            playerSelected.textContent = 'Rock';
            break;
        case 1:
            playerSelected.textContent = 'Paper';
            break;
        case 2:
            playerSelected.textContent = 'Scissors';
            break;
        case 3:
            playerSelected.textContent = 'Lizard';
            break;
        case 4:
            playerSelected.textContent = 'Spock';
            break;
    }
    // Update Item chosen by computer
    switch (computerItems.indexOf(cpuSelection)) {
        case 0:
            computerSelected.textContent = 'Rock';
            break;
        case 1:
            computerSelected.textContent = 'Paper';
            break;
        case 2:
            computerSelected.textContent = 'Scissors';
            break;
        case 3:
            computerSelected.textContent = 'Lizard';
            break;
        case 4:
            computerSelected.textContent = 'Spock';
            break;
    }
}



function winFunction() {
    message.textContent = 'You Win !';
    playerScore++;
    playerScoreEl.textContent = playerScore;
    startConfetti();
}

function triggerFunction(e) {
    // Trigger the game only if the user clicks on one of the 5 icons
    if (playerItems.includes(e.target)) {
        playGame(e);
    }
}

function resetAll() {
    // Reset Colors
    playerItems.map(el => el.style.removeProperty('filter'));
    computerItems.map(el => el.style.removeProperty('filter'));
    // Reset Score
    computerScore = 0;
    playerScore = 0;
    computerScoreEl.textContent = computerScore;
    playerScoreEl.textContent = playerScore;
    // Hide Elements
    playerHyphens.hidden = true;
    computerHyphens.hidden = true;
    playerSelected.hidden = true;
    computerSelected.hidden = true;
    message.textContent = ''
    // Remove confetti
    stopConfetti();
    removeConfetti();
}

window.addEventListener('click', triggerFunction);
resetIcon.addEventListener('click', resetAll);