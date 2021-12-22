"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let StartPlay = document.getElementById('start');
let SelectSolo = document.getElementById('solo');
let SelectMulti = document.getElementById('multiplayers');
let Go = document.getElementById('Goplay');
let home = document.getElementById('backToHomePage');
let Rules = document.getElementById('rules');
const DialogModal = document.getElementById('modalRules');
let texte;
let ruleClose = document.getElementById('closeRules');
let RulesM = document.getElementsByClassName('RulesM');
//Section for the addEventListener    
StartPlay.addEventListener("click", StartPlayer);
SelectSolo.addEventListener("click", SelectNumberPlayer);
SelectMulti.addEventListener("click", SelectNumberPlayer);
Go.addEventListener("click", goplay);
home.addEventListener("click", BackHome);
Rules.addEventListener("click", displayRule);
ruleClose.addEventListener("click", closeRules);
//function démarrer la préselection pour une partie
function StartPlayer() {
    let index;
    let selectPlayerDisplay;
    index = document.getElementById('homePage');
    index.setAttribute('class', "hidden");
    selectPlayerDisplay = document.getElementById('selectPlayers');
    selectPlayerDisplay.removeAttribute('class');
}
//function select type of game
function SelectNumberPlayer(e) {
    localStorage.removeItem('Type');
    let displayname1 = document.getElementById('Name1');
    let displayname2 = document.getElementById('Name2');
    if (displayname1.getAttribute("class") !== 'hidden') {
        displayname1.setAttribute('class', 'hidden');
    }
    if (displayname2.getAttribute("class") !== 'hidden') {
        displayname2.setAttribute('class', 'hidden');
    }
    let versionplayer;
    versionplayer = e.target.value;
    localStorage.setItem('Type', versionplayer);
    if (versionplayer === "solo") {
        displayname1.classList.toggle('hidden');
    }
    else {
        displayname1.classList.toggle('hidden');
        displayname2.classList.toggle('hidden');
    }
}
function goplay() {
    let player1;
    let player2;
    let versionplayer;
    versionplayer = localStorage.getItem('Type');
    console.log(localStorage.getItem('Type'));
    if (versionplayer === "solo") {
        player1 = document.getElementById('username1').value;
        localStorage.setItem('name1', player1);
        // player.gameVsIA();
    }
    else {
        player1 = document.getElementById('username1').value;
        player2 = document.getElementById('username2').value;
        localStorage.setItem('name1', player1);
        localStorage.setItem('name2', player2);
        // player.gameMultiplayers();
    }
}
//Function return home and reset
function BackHome() {
    let HomePage;
    let selectPlayers;
    let gameChoice;
    let playerGuess;
    let playerGuessResult;
    let chaningPlayer;
    let gameOver;
    let IAGuess;
    let IABet;
    resetLocalStorage();
    HomePage = document.getElementById('homePage');
    HomePage.removeAttributeNS('class', 'hidden');
    HomePage.removeAttribute('class');
    HomePage.setAttribute('class', 'home');
    selectPlayers = document.getElementById('selectPlayers');
    gameChoice = document.getElementById('gameChoice');
    playerGuess = document.getElementById('playerGuess');
    chaningPlayer = document.getElementById('changingPlayer');
    gameOver = document.getElementById('gameOver');
    playerGuessResult = document.getElementById('playerGuessResult');
    IAGuess = document.getElementById('IAGuess');
    IABet = document.getElementById('IABet');
    selectPlayers.setAttribute('class', "hidden");
    gameChoice.setAttribute('class', 'hidden');
    playerGuess.setAttribute('class', 'hidden');
    chaningPlayer.setAttribute('class', 'hidden');
    gameOver.setAttribute('class', 'hidden');
    playerGuessResult.setAttribute('class', 'hidden');
    chaningPlayer.setAttribute('class', 'hidden');
    IAGuess.setAttribute('class', 'hidden');
    IABet.setAttribute('class', 'hidden');
}
function resetLocalStorage() {
    localStorage.clear("http://127.0.0.1:5000");
}
//function Display rule
function displayRule() {
    let RulesM = document.getElementById('RulesM');
    RulesM.classList.toggle('hidden');
    let DialogModal = document.getElementById('modalRules');
    DialogModal.classList.toggle('hidden');
    DialogModal.setAttribute('aria-hidden', true);
}
// event listener for when click outside the modal this close it 
document.getElementById('RulesM').addEventListener("click", function (e) {
    if (!e.target.closest("#modalRules")) {
        closeRules();
    }
});
//close the modal windows 
function closeRules() {
    let DialogModal = document.getElementById('modalRules');
    DialogModal.removeAttribute('aria-modal');
    DialogModal.removeAttribute('role');
    DialogModal.setAttribute('aria-hidden', false);
    DialogModal.setAttribute('class', 'hidden');
    let RulesM = document.getElementById('RulesM');
    /* RulesM.classList.toggle('hidden'); */
    RulesM.setAttribute('class', 'hidden');
}
