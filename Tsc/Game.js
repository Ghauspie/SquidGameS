"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
// ------------------------------ BUTTON ---------------------------------------
let GoplayButton = document.getElementById('Goplay');
let validateBetButton = document.getElementById('validateChoice');
let evenButton = document.getElementById('even');
let oddButton = document.getElementById('odd');
let toIABetButton = document.getElementById('toIABet');
let toPlayerGuessButton = document.getElementById('toPlayerGuess');
let toPlayerBetButton = document.getElementById('toPlayerBet');
let replayButton = document.getElementById('replay');
// ------------------------------ SECTION ---------------------------------------
let gameChoiceSection = document.getElementById('gameChoice');
let IAGuessSection = document.getElementById('IAGuess');
let playerGuessSection = document.getElementById('playerGuess');
let selectPlayersSection = document.getElementById('selectPlayers');
let gameOverSection = document.getElementById('gameOver');
let IABetSection = document.getElementById('IABet');
let playerGuessResultSection = document.getElementById('playerGuessResult');
// ---------------------------------TEXTE------------------------------------------------
let titlePlayerBetChoice = document.getElementById('titlePlayerBetChoice');
// ------------------------------ LOCAL STORAGE ---------------------------------------
let username1 = localStorage.getItem('name1');
// ------------------------------ MATRICULES ---------------------------------------
let matricule1 = Math.floor(Math.random() * 456) + 1;
let matricule2 = Math.floor(Math.random() * 456) + 1;
// ------------------------------ NEW PLAYERS ---------------------------------------
let p1 = new Player_1.player(username1, matricule1);
let IA = new Player_1.player("IA", matricule2);
// ------------------------------ VARIABLE GLOBALES ---------------------------------------
let result;
// ---------------------- Button AddEvenListener -----------------------
GoplayButton.addEventListener('click', () => {
    document.getElementById('usernameGameChoice').innerHTML = `${p1.name}`;
    document.getElementById('matriculeGameChoice').innerHTML = `Joueur ${matricule1}`;
    selectPlayersSection.classList.toggle('hidden');
    if (randomEvenOrOdd() === "even") {
        localStorage.setItem("begin", "1");
        gameChoiceSection.classList.toggle('hidden');
        addMarblesButtons();
    }
    else {
        localStorage.setItem("begin", "2");
        IABetSection.classList.toggle('hidden');
        // L'adversaire commence
    }
});
validateBetButton.addEventListener('click', () => {
    document.getElementById('usernameGameChoice').innerHTML = `${p1.name}`;
    document.getElementById('matriculeGameChoice').innerHTML = `Joueur ${matricule1}`;
    if (p1.marblesBet === 0) {
        document.getElementById('titlePlayerBetChoice').innerHTML = `Veuillez choisir un nombre de bille a parier !`;
    }
    else {
        gameChoiceSection.classList.toggle('hidden');
        IAGuessSection.classList.toggle('hidden');
        let p = randomEvenOrOdd();
        result = IA.guess(p, p1);
        document.getElementById('titleIAGuess').innerHTML = `Joueur <strong>${matricule2}</strong> a choisi <strong>${p == "even" ? "Pair" : "Impair"}</strong>`;
        document.getElementById('resultIAGuess').innerHTML = result ? `L'adversaire a gagné <strong>${IA.gainedOrLost}</strong> billes!` : `L'adversaire a perdu <strong>${p1.gainedOrLost}</strong> billes!`;
    }
});
toIABetButton.addEventListener('click', () => {
    IAGuessSection.classList.toggle('hidden');
    if (p1.isDead()) {
        document.getElementById('tittleWinOrLoose').innerHTML = `Game Over !`;
        document.getElementById('txtWinOrLoose').innerHTML = `${p1.name}: joueur n°${matricule1}, vous avez perdu !`;
        gameOverSection.classList.toggle('hidden');
    }
    else if (IA.isDead()) {
        document.getElementById('tittleWinOrLoose').innerHTML = `Victoire !`;
        document.getElementById('txtWinOrLoose').innerHTML = `Bravo ${p1.name}: joueur n°${matricule1}, vous avez gagné !`;
        gameOverSection.classList.toggle('hidden');
    }
    else {
        document.getElementById('guessIAEvenOrOdd').innerHTML = `À <strong>${p1.name}</strong> de deviner  !`;
        IABetSection.classList.toggle('hidden');
    }
});
toPlayerGuessButton.addEventListener('click', () => {
    IABetSection.classList.toggle('hidden');
    playerGuessSection.classList.toggle('hidden');
    IA.bet(randomMarblesNumber(IA.marbles));
});
evenButton.addEventListener('click', () => {
    playerGuess("even");
    document.getElementById('titlePlayerGuessResult').innerHTML = `${p1.name} a choisi <strong>Pair</strong>`;
});
oddButton.addEventListener('click', () => {
    playerGuess("odd");
    document.getElementById('titlePlayerGuessResult').innerHTML = `${p1.name} a choisi <strong>Impair</strong>`;
});
toPlayerBetButton.addEventListener('click', () => {
    playerGuessResultSection.classList.toggle('hidden');
    if (p1.isDead()) {
        document.getElementById('tittleWinOrLoose').innerHTML = `Game Over !`;
        document.getElementById('txtWinOrLoose').innerHTML = `${p1.name}: joueur n°${matricule1}, vous avez perdu !`;
        gameOverSection.classList.toggle('hidden');
    }
    else if (IA.isDead()) {
        document.getElementById('tittleWinOrLoose').innerHTML = `Victoire !`;
        document.getElementById('txtWinOrLoose').innerHTML = `Bravo ${p1.name}: joueur n°${matricule1}, vous avez gagné !`;
        gameOverSection.classList.toggle('hidden');
    }
    else {
        gameChoiceSection.classList.toggle('hidden');
        addMarblesButtons();
    }
});
replayButton.addEventListener('click', () => {
    gameOverSection.classList.toggle('hidden');
    p1.reset();
    IA.reset();
    let beginner = localStorage.getItem("begin");
    if (beginner === "1") {
        localStorage.setItem("begin", "2");
        IABetSection.classList.toggle('hidden');
    }
    else {
        localStorage.setItem("begin", "1");
        gameChoiceSection.classList.toggle('hidden');
        addMarblesButtons();
    }
});
// ----------------------------- Function VERSUS IA ------------------------------------------------
function playerGuess(p) {
    result = p1.guess(p, IA);
    document.getElementById('txtPlayerGuessResult').innerHTML = result ? `${p1.name} a gagné ${p1.gainedOrLost} billes!` : `${p1.name} a perdu ${IA.gainedOrLost} billes!`;
    playerGuessSection.classList.toggle('hidden');
    playerGuessResultSection.classList.toggle('hidden');
    // Ajouter le text Player guess result section
}
// -------------------------- IA random marbles bet and even or odd-------------------
function randomMarblesNumber(max) {
    let randomMarbles = Math.floor(Math.random() * max) + 1;
    console.log("Billes pariées par l'IA: ", randomMarbles);
    return randomMarbles;
}
function randomEvenOrOdd() {
    if (Math.round(Math.random()) === 0) {
        console.log("IA dit pair");
        return "even";
    }
    else {
        console.log("IA dit Impair");
        return "odd";
    }
}
// ---------------------- marbles buttons  ---------------
function addMarblesButtons() {
    let docContext = document.getElementById("btnMarbles");
    docContext.innerHTML = "";
    console.log("nombre de billes de p1 :", p1.marbles);
    for (let i = 1; i <= p1.marbles; i++) {
        let button = document.createElement("button");
        button.innerHTML = "<span class='big'> </span>" + i.toString();
        button.id = "btnMarble" + i;
        button.className = "marble marble" + p1.colorMarbles[i];
        button.onclick = function () { p1.bet(i); };
        docContext.appendChild(button);
    }
    console.log(`Ajout des ${p1.marbles} billes de ${p1.name}`);
}
