"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
// ------------------------------ BUTTON ---------------------------------------
let goPlayButton = document.getElementById('Goplay');
let startPlayButton = document.getElementById("start");
let toIAGuessButton = document.getElementById('toIAGuess');
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
let username1;
username1 = localStorage.getItem('name1');
// ------------------------------ MATRICULES ---------------------------------------
let matricule1 = Math.floor(Math.random() * 456) + 1;
let matricule2 = Math.floor(Math.random() * 456) + 1;
// ------------------------------ NEW PLAYERS ---------------------------------------
let p1 = new Player_1.player(username1, matricule1);
let IA = new Player_1.player("IA", matricule2);
// ------------------------------ VARIABLE GLOBALES ---------------------------------------
let result;
//Pour le changement de background-image avec une animation.
//Le div doit être visible à l'écran au moment de l'appel
//Il faut donc utiliser un setTimeout() avant appel pour voir l'effet de transition
/**
 * Change la valeur d'une propriété dans un style.
 * Exemple, changeStyle("game.css", ".title", "color", "white")
 * Ira changer dans le fichier de style game.css référencé le style ".title",
 * et changera "color: xxx" en "color: white"
 * @param cssFile nom du fichier de style à modifier
 * @param selector nom du sélecteur CSS recherché
 * @param prop propriété à changer dans le sélecteur (doit exister)
 * @param value valeur à attribuer au sélecteur
 */
function changeStyle(cssFile, selector, prop, value) {
    var styles = document.styleSheets;
    for (let i = 0; i < styles.length; i++) {
        let href = document.styleSheets[i].href;
        if (href != null && href.indexOf(cssFile) != -1) {
            let ruleList = document.styleSheets[i].cssRules;
            for (let r = 0; r < ruleList.length; r++) {
                let rule = ruleList[r];
                if (!(rule instanceof CSSStyleRule)) {
                    continue;
                }
                if (rule.selectorText == selector) {
                    //Pour une raison étrange prop doit être any
                    rule.style[prop] = value;
                }
            }
        }
    }
}
// ---------------------- Button AddEvenListener -----------------------
startPlayButton.addEventListener("click", () => {
    let homePage = document.getElementById('homePage');
    homePage.classList.toggle("hidden");
    selectPlayersSection.classList.toggle("hidden");
    console.log("test start");
    setTimeout(changeStyle, 10, "game.css", "#selectPlayers", "background-image", "url('../Pictures/selectPlayers.jpg')");
});
goPlayButton.addEventListener('click', () => {
    changeStyle("game.css", "#selectPlayers", "background-image", "url('../Pictures/selectPlayersBackground.png')");
    addMarblesButtons();
    selectPlayersSection.classList.toggle('hidden');
    gameChoiceSection.classList.toggle('hidden');
    setTimeout(changeStyle, 10, "game.css", "#gameChoice", "background-image", "url('../Pictures/gameChoice.jpg')");
});
toIAGuessButton.addEventListener('click', () => {
    gameChoiceSection.classList.toggle('hidden');
    IAGuessSection.classList.toggle('hidden');
    let pairImpair = randomEvenOrOdd();
    result = IA.guess(pairImpair, p1);
    document.getElementById('titleIAGuess').innerHTML = `${IA.name} a choisi ${pairImpair == "even" ? "pair" : "impair"}`;
    document.getElementById('resultIAGuess').innerHTML = result ? "Il gagne !" : "Il perd !";
    changeStyle("game.css", "#gameChoice", "background-image", "url('../Pictures/gameChoiceBackground.png')");
    if (result) {
        setTimeout(changeStyle, 10, "game.css", "#IAGuess", "background-image", "url('../Pictures/IAGuessWin.jpg')");
    }
    else {
        setTimeout(changeStyle, 10, "game.css", "#IAGuess", "background-image", "url('../Pictures/IAGuessLoose.jpg')");
    }
});
toIABetButton.addEventListener('click', () => {
    changeStyle("game.css", "#IAGuess", "background-image", "url('../Pictures/IAGuessBackground.png')");
    IAGuessSection.classList.toggle('hidden');
    if (p1.isDead() || IA.isDead()) {
        gameOverSection.classList.toggle('hidden');
        setTimeout(changeStyle, 10, "game.css", "#gameOver", "background-image", "url('../Pictures/gameOver.jpg')");
    }
    else {
        IABetSection.classList.toggle('hidden');
        setTimeout(changeStyle, 10, "game.css", "#IABet", "background-image", "url('../Pictures/IABet.jpg')");
        // Compléter le texte à afficher dans la section
    }
});
toPlayerGuessButton.addEventListener('click', () => {
    changeStyle("game.css", "#IABet", "background-image", "url('../Pictures/IABetBackground.png')");
    IABetSection.classList.toggle('hidden');
    playerGuessSection.classList.toggle('hidden');
    IA.bet(randomMarblesNumber(IA.marbles));
    setTimeout(changeStyle, 10, "game.css", "#playerGuess", "background-image", "url('../Pictures/playerGuess.jpg')");
});
evenButton.addEventListener('click', () => {
    playerGuess("even");
});
oddButton.addEventListener('click', () => {
    playerGuess("odd");
});
/**
 * Appel par clic sur bouton
 * @param pairOuImpair le choix du joueur
 */
function playerGuess(pairOuImpair) {
    changeStyle("game.css", "#playerGuess", "background-image", "url('../Pictures/playerGuessBackground.png')");
    result = p1.guess(pairOuImpair, IA);
    playerGuessSection.classList.toggle('hidden');
    playerGuessResultSection.classList.toggle('hidden');
    if (result) {
        setTimeout(changeStyle, 10, "game.css", "#playerGuessResult", "background-image", "url('../Pictures/playerGuessResultWin.jpg')");
    }
    else {
        setTimeout(changeStyle, 10, "game.css", "#playerGuessResult", "background-image", "url('../Pictures/playerGuessResultLoose.jpg')");
    }
    // Ajouter le text Player guess result section
}
toPlayerBetButton.addEventListener('click', () => {
    changeStyle("game.css", "#playerGuessResult", "background-image", "url('../Pictures/playerGuessResultBackground.png')");
    playerGuessResultSection.classList.toggle('hidden');
    if (p1.isDead() || IA.isDead()) {
        gameOverSection.classList.toggle('hidden');
        setTimeout(changeStyle, 10, "game.css", "#gameOver", "background-image", "url('../Pictures/gameOver.jpg')");
    }
    else {
        addMarblesButtons();
        gameChoiceSection.classList.toggle('hidden');
        setTimeout(changeStyle, 10, "game.css", "#gameChoice", "background-image", "url('../Pictures/gameChoice.jpg')");
    }
});
replayButton.addEventListener('click', () => {
    p1.reset();
    IA.reset();
    //Ajouter ici 
});
// -------------------------- IA random marbles bet and even or odd-------------------
function randomMarblesNumber(max) {
    let randomMarbles = Math.floor(Math.random() * max) + 1;
    console.log("Billes pariées par l'IA: ", randomMarbles);
    return randomMarbles;
}
function randomEvenOrOdd() {
    let randomEvenOrOdd = Math.round(Math.random());
    if (randomEvenOrOdd === 0) {
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
