"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
// ------------------------------ BUTTON ---------------------------------------
let GoplayButton = document.getElementById('Goplay');
let myTurnButton = document.getElementById('myTurn');
let validateBetButton = document.getElementById('validateChoice');
let evenButton = document.getElementById('even');
let oddButton = document.getElementById('odd');
// ------------------------------ INPUT ---------------------------------------
let username1Input = document.getElementById('username1');
let username2Input = document.getElementById('username2');
let marblesBetInput = document.getElementById('numberOfMarbles');
// ------------------------------ SECTION ---------------------------------------
let gameChoiceSection = document.getElementById('gameChoice');
let selectPlayersSection = document.getElementById('selectPlayers');
let gameGuessSection = document.getElementById('gameGuess');
let changingPlayerSection = document.getElementById('changingPlayer');
let displayMarblesP1 = document.getElementById('marblesplayer1');
let displayMarblesP2 = document.getElementById('marblesplayer1');
// ------------------------------ LOCAL STORAGE ---------------------------------------
let versionPlayer = localStorage.getItem('Type');
let username1 = localStorage.getItem('name1');
let username2 = localStorage.getItem('name2');
let playerTurn = localStorage.getItem('playerTurn');
// ------------------------------ MATRICULES ---------------------------------------
let matricule1 = Math.floor(Math.random() * 457);
let matricule2 = Math.floor(Math.random() * 457);
// ------------------------------ NEW PLAYERS ---------------------------------------
let p1 = new Player_1.player(username1, matricule1);
let p2 = new Player_1.player(username2, matricule2);
let IA = new Player_1.player("IA", matricule2);
// ------------------------------ VARIABLE GLOBALES ---------------------------------------
// let p1 = new player("moi", 123);
// let p2 = new player("lui", 345)
// console.log("p2 mise 4 billes");
// p2.bet(4);
// console.log("p1 devine pair");
// if (p1.guess("even", p2)) {
//     console.log(`p1 a gagné, il a ${p1.marbles} billes, et p2 en a ${p2.marbles}.`);
// } else {
//     console.log("p1 a perdu ?");
// }
// console.log("p1 mise 3 billes");
// p1.bet(7);
// console.log("p2 devine impair");
// if (p2.guess("even", p1)) {
//     console.log(`p2 a gagné, il a ${p2.marbles} billes, et p1 en a ${p1.marbles}.`);
// } else {
//     console.log(`p2 a perdu, il a ${p2.marbles} billes, et p1 en a ${p1.marbles}.`);
// }
// let button = document.getElementById('testMarbles') as HTMLButtonElement;
// button.addEventListener('click', addMarblesButtons);
function addMarblesButtons() {
    // p1.marbles = Math.floor(Math.random() * 19) + 1;
    console.log(`Ajout des ${p1.marbles} billes de ${p1.name}`);
    let docContext = document.getElementById("btnMarbles");
    docContext.innerHTML = "";
    for (let i = 1; i <= p1.marbles; i++) {
        let button = document.createElement("button");
        button.innerHTML = "<span class='big'> </span>" + i.toString();
        button.id = "btnMarble" + i;
        button.className = "marble marble" + p1.colorMarbles[i];
        button.onclick = function () { p1.bet(i); };
        docContext.appendChild(button);
    }
}
// ---------------------- Button AddEvenListener -----------------------
GoplayButton.addEventListener('click', () => {
    playerTurn = localStorage.setItem("playerTurn", p1.name);
    versionPlayer = localStorage.getItem('Type');
    if (versionPlayer === "") {
        console.log("Veuillez choisir un mode");
    }
    else if (versionPlayer === "solo") {
        playerTurn = localStorage.setItem("playerTurn", p1.name);
        selectPlayersSection.setAttribute('class', "hidden");
        gameChoiceSection.removeAttribute('class');
    }
    else {
        playerTurn = localStorage.setItem("playerTurn", p1.name);
        selectPlayersSection.setAttribute('class', "hidden");
        gameChoiceSection.removeAttribute('class');
        getUsername();
    }
});
myTurnButton.addEventListener('click', () => {
});
validateBetButton.addEventListener('click', () => {
    versionPlayer = localStorage.getItem('Type');
    gameChoiceSection.setAttribute('class', "hidden");
    gameGuessSection.removeAttribute('class');
    if (versionPlayer === "solo") {
        if (IA.marbles <= 0) {
            alert("C'est gagné !!");
        }
        else if (p1.marbles === 0) {
            alert("C'est perdu !");
        }
        else {
            gameVsIA();
        }
    }
    else if (versionPlayer === "multiplayers") {
        gameMultiplayers();
    }
});
evenButton.addEventListener('click', () => {
    versionPlayer = localStorage.getItem('Type');
    gameGuessSection.setAttribute('class', "hidden");
    gameChoiceSection.removeAttribute('class');
    if (versionPlayer === "solo") {
        p1.guess("even", IA);
    }
    else if (versionPlayer === "multiplayers") {
        playerTurn = localStorage.getItem('playerTurn');
        if (playerTurn === p1.name) {
            p1.guess("even", p2);
        }
        else if (playerTurn === p2.name) {
            p2.guess("even", p1);
        }
    }
});
oddButton.addEventListener('click', () => {
    versionPlayer = localStorage.getItem('Type');
    gameGuessSection.setAttribute('class', "hidden");
    gameChoiceSection.removeAttribute('class');
    if (versionPlayer === "solo") {
        p1.guess("odd", IA);
    }
    else if (versionPlayer === "multiplayers") {
        playerTurn = localStorage.getItem('playerTurn');
        if (playerTurn === p1.name) {
            if (evenOrOdd())
                p1.guess("odd", p2);
        }
        else if (playerTurn === p2.name) {
            p2.guess("odd", p1);
        }
    }
});
// ----------------------------- Function VERSUS IA ------------------------------------------------
function gameVsIA() {
    playerTurn = localStorage.getItem('playerTurn');
    if (IA.marbles <= 0) {
        alert("C'est gagné !!");
    }
    else if (p1.marbles === 0) {
        alert("C'est perdu !");
    }
    else {
        if (playerTurn === p1.name) {
            p1.bet(+marblesBetInput.value);
            if (evenOrOdd() === randomEvenOrOdd()) {
                console.log("IA a trouvé la solution");
                IA.guess("even", p1);
            }
            else {
                console.log("IA n'a pas trouvé la solution");
                IA.guess("odd", p1);
            }
        }
        else {
            let randomBetIA = randomMarblesNumber(IA.marbles);
            IA.bet(randomBetIA);
            console.log("IA bet : ", randomBetIA);
        }
    }
    if (IA.marbles != 0) {
        let randomBetIA = randomMarblesNumber(IA.marbles);
        IA.bet(randomBetIA);
        console.log("IA bet : ", randomBetIA);
    }
    switchPlayer();
}
// ----------------------Game 1 V 1--------------------------------
function gameMultiplayers() {
    playerTurn = localStorage.getItem('playerTurn');
    if (playerTurn === p1.name) {
        let betMarbles = marblesBetInput.value;
        p1.bet(+betMarbles);
        console.log(p1);
        console.log(`Joueur 1 mise : ${betMarbles}`);
        switchPlayer();
    }
    else if (playerTurn === p2.name) {
        let betMarbles = marblesBetInput.value;
        p2.bet(+betMarbles);
        console.log(p2);
        console.log(`Joueur 2 mise : ${betMarbles}`);
        switchPlayer();
    }
}
// ------------------- Username ----------------------
function getUsername() {
    let username1 = username1Input.value;
    let username2 = username2Input.value;
    localStorage.setItem('name1', username1);
    localStorage.setItem('name2', username2);
    console.log(p1, p2);
}
function switchPlayer() {
    versionPlayer == localStorage.getItem("Type");
    if (versionPlayer === "solo") {
        playerTurn = localStorage.getItem("playerTurn");
        if (playerTurn === p1.name) {
            playerTurn = localStorage.setItem("playerTurn", "IA");
        }
        else if (playerTurn === "IA") {
            playerTurn = localStorage.setItem("playerTurn", p1.name);
        }
    }
    else if (versionPlayer === "multiplayers") {
        playerTurn = localStorage.getItem('playerTurn');
        if (playerTurn === p1.name) {
            playerTurn = localStorage.setItem("playerTurn", p2.name);
        }
        else {
            playerTurn = localStorage.setItem("playerTurn", p1.name);
        }
    }
}
function evenOrOdd() {
    playerTurn = localStorage.getItem('playerTurn');
    let betMarbles = marblesBetInput.value;
    if (playerTurn === p1.name) {
        if (+betMarbles % 2 === 0) {
            return "even";
        }
        else {
            return "odd";
        }
    }
}
function randomMarblesNumber(max) {
    let randomMarbles = Math.floor(Math.random() * max) + 1;
    console.log(randomMarbles);
    console.log("Billes pariées par l'IA: ", randomMarbles);
    return randomMarbles;
}
// ia function random pair/impair 
function randomEvenOrOdd() {
    let randomEvenOrOdd = Math.floor(Math.random() * 2);
    if (randomEvenOrOdd === 1) {
        console.log("IA dit pair");
        return "even";
    }
    else {
        console.log("IA dit Impair");
        return "odd";
    }
}
