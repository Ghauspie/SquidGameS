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
    addMarblesButtons();
    console.log("wait!");
    changeStyle("#gameChoice", "background-image", 'url("../Pictures/marblesHand.jpg")');
    changeStyle("#gameChoice", "color", "white");
    selectPlayersSection.classList.toggle('hidden');
    gameChoiceSection.classList.toggle('hidden');
    //(document.getElementById("gameChoice") as HTMLDivElement).style.backgroundImage = 'url("../Pictures/marblesHand.jpg")';
});
let testButton = document.getElementById("test");
testButton.addEventListener("click", () => {
    changeStyle("#gameChoice", "background-image", 'url("../Pictures/marblesHand.jpg")');
});
function changeStyle(selector, prop, value) {
    var styles = document.styleSheets;
    for (let i = 0; i < styles.length; i++) {
        let href = document.styleSheets[i].href;
        console.log(href);
        if (href != null && href.indexOf("game.css") != -1) {
            let ruleList = document.styleSheets[i].cssRules;
            console.log(ruleList);
            for (let j = 0; j < ruleList.length; j++) {
                let rule = ruleList[j];
                if (!(rule instanceof CSSStyleRule)) {
                    continue;
                }
                if (rule.selectorText == selector) {
                    console.log("selector " + rule.selectorText);
                    rule.style[prop] = value;
                }
            }
        }
    }
}
//changeStyle('.good', 'color', 'purple');
//changeStyle('.bad', 'color', 'yellow');
validateBetButton.addEventListener('click', () => {
    gameChoiceSection.classList.toggle('hidden');
    IAGuessSection.classList.toggle('hidden');
    let p = randomEvenOrOdd();
    result = IA.guess(p, p1);
    document.getElementById('titleIAGuess').innerHTML = `${IA.name} a choisi ${p == "even" ? "pair" : "impair"}`;
    document.getElementById('resultIAGuess').innerHTML = result ? "Il gagne !" : "Il perd !";
});
toIABetButton.addEventListener('click', () => {
    IAGuessSection.classList.toggle('hidden');
    if (p1.isDead() || IA.isDead()) {
        gameOverSection.classList.toggle('hidden');
    }
    else {
        IABetSection.classList.toggle('hidden');
        // Compléter le texte à afficher dans la section
    }
});
toPlayerGuessButton.addEventListener('click', () => {
    IABetSection.classList.toggle('hidden');
    playerGuessSection.classList.toggle('hidden');
    IA.bet(randomMarblesNumber(IA.marbles));
});
evenButton.addEventListener('click', () => {
    playerGuess("even");
});
oddButton.addEventListener('click', () => {
    playerGuess("odd");
});
toPlayerBetButton.addEventListener('click', () => {
    playerGuessResultSection.classList.toggle('hidden');
    if (p1.isDead() || IA.isDead()) {
        gameOverSection.classList.toggle('hidden');
    }
    else {
        addMarblesButtons();
        gameChoiceSection.classList.toggle('hidden');
    }
});
replayButton.addEventListener('click', () => {
    // p1 = new player(p1.name, parseInt(p1.getMatricule()));
    // IA = new player(IA.name, parseInt(IA.getMatricule()));
});
// ----------------------------- Function VERSUS IA ------------------------------------------------
function playerGuess(p) {
    result = p1.guess(p, IA);
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
    let randomEvenOrOdd = Math.floor(Math.random() * 2);
    if (randomEvenOrOdd = 0) {
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
    for (let i = 1; i <= p1.marbles; i++) {
        let button = document.createElement("button");
        button.innerHTML = `<span class='big'> </span>${i}`;
        button.id = `btnMarble${i}`;
        button.className = `marble marble${p1.colorMarbles[i]}`;
        button.onclick = function () { p1.bet(i); };
        docContext.appendChild(button);
    }
    console.log(`Ajout des ${p1.marbles} billes de ${p1.name}`);
}
