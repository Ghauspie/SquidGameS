"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
// ------------------------------ BUTTON ---------------------------------------
let goPlayButton = document.getElementById('goPlay');
let startPlayButton = document.getElementById("start");
let toIAGuessButton = document.getElementById('toIAGuess');
let evenButton = document.getElementById('even');
let oddButton = document.getElementById('odd');
let toIABetButton = document.getElementById('toIABet');
let toPlayerGuessButton = document.getElementById('toPlayerGuess');
let toPlayerBetButton = document.getElementById('toPlayerBet');
let replayButton = document.getElementById('replay');
// ------------------------------ SECTION ---------------------------------------
let homePage = document.getElementById('homePage');
let gameChoiceSection = document.getElementById('gameChoice');
let IAGuessSection = document.getElementById('IAGuess');
let playerGuessSection = document.getElementById('playerGuess');
let selectPlayersSection = document.getElementById('selectPlayers');
let gameOverSection = document.getElementById('gameOver');
let IABetSection = document.getElementById('IABet');
let playerGuessResultSection = document.getElementById('playerGuessResult');
let titleGameChoice = document.getElementById('titleGameChoice');
let resultGameChoice = document.getElementById('resultGameChoice');
let titleIAGuess = document.getElementById('titleIAGuess');
let resultIAGuess = document.getElementById('resultIAGuess');
let titleGameOver = document.getElementById('titleGameOver');
let resultGameOver = document.getElementById('resultGameOver');
let titleIABet = document.getElementById('titleIABet');
let resultIABet = document.getElementById('resultIABet');
let titlePlayerGuess = document.getElementById('titlePlayerGuess');
let titlePlayerGuessResult = document.getElementById('titlePlayerGuessResult');
let resultPlayerGuessResult = document.getElementById('resultPlayerGuessResult');
// ------------------------------ LOCAL STORAGE ---------------------------------------
let username1;
username1 = localStorage.getItem('name1');
// ------------------------------ MATRICULES ---------------------------------------
let matricule2 = Math.floor(Math.random() * 456) + 1;
// ------------------------------ NEW PLAYERS ---------------------------------------
let p1; // = new player(username1, matricule1);
let IA; // = new player("Oh Il-Nam", 1);
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
    homePage.classList.add("hidden");
    selectPlayersSection.classList.remove("hidden");
    setTimeout(changeStyle, 10, "game.css", "#selectPlayers", "background-image", "url('../Pictures/selectPlayers.jpg')");
});
goPlayButton.addEventListener('click', () => {
    //let matricule1 = Math.floor(Math.random() * 455) + 2; //on évite 1 pris par l'IA
    p1 = new Player_1.player(username1, 456);
    IA = new Player_1.player("Oh Il-Nam", 1);
    changeStyle("game.css", "#selectPlayers", "background-image", "url('../Pictures/selectPlayersBackground.png')");
    addMarblesButtons();
    selectPlayersSection.classList.add('hidden');
    //On tire au sort celui qui commence
    if (randomEvenOrOdd() === "even") {
        //Le joueur commence
        //localStorage.setItem("begin", "1");
        p1.begin = true;
        IA.begin = false;
        titleGameChoice.innerHTML = `MATRICULE ${p1.getMatricule()} CHOISI TA MISE.`;
        gameChoiceSection.classList.remove('hidden');
        setTimeout(changeStyle, 10, "game.css", "#gameChoice", "background-image", "url('../Pictures/gameChoice.jpg')");
    }
    else {
        //IA commence
        //localStorage.setItem("begin", "2");
        p1.begin = false;
        IA.begin = true;
        IABetSection.classList.remove('hidden');
        titleIABet.innerHTML = `MATRICULE ${IA.getMatricule()} PARIE`;
        resultIABet.innerHTML = `${IA.name} A FAIT SON CHOIX.`;
        setTimeout(changeStyle, 10, "game.css", "#IABet", "background-image", "url('../Pictures/IABet.jpg')");
    }
});
toIAGuessButton.addEventListener('click', () => {
    try {
        let pairImpair = randomEvenOrOdd();
        result = IA.guess(pairImpair, p1); //throw error if no marbles bet by p1
        gameChoiceSection.classList.add('hidden');
        IAGuessSection.classList.remove('hidden');
        let s = (IA.gainedOrLost > 1) ? "s" : ""; //billes au pluriel ?
        titleIAGuess.innerHTML = `MATRICULE <strong>${IA.getMatricule()}</strong> A CHOISI <strong>${pairImpair == "even" ? "PAIR" : "IMPAIR"}.</strong>`;
        resultIAGuess.innerHTML = result ? `${IA.name} gagne <strong>${IA.gainedOrLost}</strong> bille${s} !` : `${IA.name} perd <strong>${p1.gainedOrLost}</strong> bille${s} !`;
        changeStyle("game.css", "#gameChoice", "background-image", "url('../Pictures/gameChoiceBackground.png')");
        if (result) {
            setTimeout(changeStyle, 10, "game.css", "#IAGuess", "background-image", "url('../Pictures/IAGuessWin.jpg')");
        }
        else {
            setTimeout(changeStyle, 10, "game.css", "#IAGuess", "background-image", "url('../Pictures/IAGuessLoose.jpg')");
        }
    }
    catch (error) {
        resultGameChoice.innerHTML = `${p1.name}, clique d'abord sur une bille pour miser !`;
    }
});
toIABetButton.addEventListener('click', () => {
    changeStyle("game.css", "#IAGuess", "background-image", "url('../Pictures/IAGuessBackground.png')");
    IAGuessSection.classList.add('hidden');
    if (p1.isDead() || IA.isDead()) {
        updateGameOver();
        gameOverSection.classList.remove('hidden');
        setTimeout(changeStyle, 10, "game.css", "#gameOver", "background-image", "url('../Pictures/gameOver.jpg')");
    }
    else {
        IABetSection.classList.remove('hidden');
        titleIABet.innerHTML = `MATRICULE ${IA.getMatricule()} PARIE`;
        resultIABet.innerHTML = `${IA.name} A FAIT SON CHOIX.`;
        setTimeout(changeStyle, 10, "game.css", "#IABet", "background-image", "url('../Pictures/IABet.jpg')");
    }
});
toPlayerGuessButton.addEventListener('click', () => {
    changeStyle("game.css", "#IABet", "background-image", "url('../Pictures/IABetBackground.png')");
    IABetSection.classList.add('hidden');
    playerGuessSection.classList.remove('hidden');
    titlePlayerGuess.innerHTML = `${p1.getMatricule()} TU DOIS DEVINER`;
    //pas de result, mais les deux boutons
    IA.bet(randomMarblesNumber(IA.marbles));
    setTimeout(changeStyle, 10, "game.css", "#playerGuess", "background-image", "url('../Pictures/playerGuess.jpg')");
});
evenButton.addEventListener('click', () => playerGuess("even"));
oddButton.addEventListener('click', () => playerGuess("odd"));
/**
 * Appel par clic sur bouton
 * @param pairOuImpair le choix du joueur
 */
function playerGuess(pairOuImpair) {
    changeStyle("game.css", "#playerGuess", "background-image", "url('../Pictures/playerGuessBackground.png')");
    result = p1.guess(pairOuImpair, IA);
    let s = (p1.gainedOrLost > 1) ? "s" : ""; //billes au pluriel ?
    resultPlayerGuessResult.innerHTML = result ? `${p1.name} gagne ${p1.gainedOrLost} bille${s} !` : `${p1.name} perd ${IA.gainedOrLost} bille${s} !`;
    playerGuessSection.classList.add('hidden');
    playerGuessResultSection.classList.remove('hidden');
    if (result) {
        setTimeout(changeStyle, 10, "game.css", "#playerGuessResult", "background-image", "url('../Pictures/playerGuessResultWin.jpg')");
    }
    else {
        setTimeout(changeStyle, 10, "game.css", "#playerGuessResult", "background-image", "url('../Pictures/playerGuessResultLoose.jpg')");
    }
}
toPlayerBetButton.addEventListener('click', () => {
    changeStyle("game.css", "#playerGuessResult", "background-image", "url('../Pictures/playerGuessResultBackground.png')");
    playerGuessResultSection.classList.add('hidden');
    if (p1.isDead() || IA.isDead()) {
        updateGameOver();
        gameOverSection.classList.remove('hidden');
        setTimeout(changeStyle, 10, "game.css", "#gameOver", "background-image", "url('../Pictures/gameOver.jpg')");
    }
    else {
        addMarblesButtons();
        titleGameChoice.innerHTML = `MATRICULE ${p1.getMatricule()} CHOISI TA MISE.`;
        resultGameChoice.innerHTML = ""; //rappel de clic sur bille
        gameChoiceSection.classList.remove('hidden');
        setTimeout(changeStyle, 10, "game.css", "#gameChoice", "background-image", "url('../Pictures/gameChoice.jpg')");
    }
});
replayButton.addEventListener('click', () => {
    changeStyle("game.css", "#gameOver", "background-image", "url('../Pictures/gameOverBackground.png')");
    gameOverSection.classList.add('hidden');
    p1.reset();
    IA.reset();
    if (IA.begin) {
        IABetSection.classList.remove('hidden');
        setTimeout(changeStyle, 10, "game.css", "#IABet", "background-image", "url('../Pictures/IABet.jpg')");
    }
    else {
        gameChoiceSection.classList.remove('hidden');
        addMarblesButtons();
        titleGameChoice.innerHTML = `MATRICULE ${p1.getMatricule()} CHOISI TA MISE.`;
        gameChoiceSection.classList.remove('hidden');
        setTimeout(changeStyle, 10, "game.css", "#gameChoice", "background-image", "url('../Pictures/gameChoice.jpg')");
    }
});
function updateGameOver() {
    titleGameOver.innerHTML = p1.isDead() ? "GAME OVER !" : "VICTOIRE !";
    resultGameOver.innerHTML = p1.isDead() ? `JOUEUR MATRICULE ${p1.getMatricule()}, VOUS AVEZ PERDU.` : `BRAVO JOUEUR MATRICULE ${p1.getMatricule()}, VOUS GAGNEZ CETTE PARTIE.`;
}
// -------------------------- IA random marbles bet and even or odd-------------------
function randomMarblesNumber(billes) {
    let randomMarbles;
    let max;
    let d100 = Math.floor(Math.random() * 100);
    if (d100 < 10) {
        //ce fou parie éventuellement toutes ses billes...
        max = billes;
    }
    else if (d100 < 40) {
        //parfois jusqu'à 60% de ses billes
        max = Math.round(billes * 6 / 10);
    }
    else {
        //le plus souvent, jusqu'à 30% de ses billes pour faire durer le plaisir
        max = Math.round(billes * 3 / 10);
    }
    console.log("mise max " + max);
    randomMarbles = Math.floor(Math.random() * max) + 1;
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
