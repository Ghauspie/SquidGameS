(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
let backHome = document.getElementById('backToHomePage');
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
        titleGameChoice.innerHTML = `MATRICULE ${p1.getMatricule()} CHOISIS TA MISE.`;
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
        resultGameChoice.innerHTML = `${p1.name}, tu dois d'abord cliquer sur une bille pour miser !`;
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
evenButton.addEventListener('click', () => {
    playerGuess("even");
    document.getElementById('titlePlayerGuessResult').innerHTML = `${username1}, VOUS AVEZ CHOISI <strong>PAIR</strong>`;
});
oddButton.addEventListener('click', () => {
    playerGuess("odd");
    document.getElementById('titlePlayerGuessResult').innerHTML = `${username1}, VOUS AVEZ CHOISI <strong>IMPAIR</strong>`;
});
backHome.addEventListener('click', () => {
    p1.reset();
    IA.reset();
});
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
        document.getElementById('titlePlayerGuessResult').innerHTML = `Vous avez gagné <strong>${p1.gainedOrLost}</strong> billes!`;
        setTimeout(changeStyle, 10, "game.css", "#playerGuessResult", "background-image", "url('../Pictures/playerGuessResultWin.jpg')");
    }
    else {
        document.getElementById('titlePlayerGuessResult').innerHTML = `Vous avez perdu <strong>${IA.gainedOrLost}</strong> billes!`;
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

},{"./Player":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let StartPlay = document.getElementById('start');
let SelectSolo = document.getElementById('solo');
let SelectMulti = document.getElementById('multiplayers');
let Go = document.getElementById('goPlay');
let home = document.getElementById('backToHomePage');
let Rules = document.getElementById('rules');
const DialogModal = document.getElementById('modalRules');
let texte;
let ruleClose = document.getElementById('closeRules');
let RulesM = document.getElementsByClassName('RulesM');
//Section for the addEventListener    
//StartPlay.addEventListener("click",StartPlayer);
SelectSolo.addEventListener("click", SelectNumberPlayer);
SelectMulti.addEventListener("click", SelectNumberPlayer);
Go.addEventListener("click", goplay);
home.addEventListener("click", BackHome);
Rules.addEventListener("click", displayRule);
ruleClose.addEventListener("click", closeRules);
function preloadImg() {
    for (let i = 1; i <= 9; i++) {
        let img = new Image();
        img.src = `./Pictures/marble${i}.png`;
    }
}
//todo
function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function () {
            var index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        };
        list.push(img);
        img.src = array[i];
    }
}
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
    console.log(versionplayer);
    console.log(localStorage.getItem('Type'));
    if (versionplayer === "solo") {
        player1 = document.getElementById('username1');
        localStorage.setItem('name1', player1.value);
        //gameVsIA();
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
    /* let RulesM=document.getElementById('RulesM') as HTMLElement; */
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
    /* let RulesM=document.getElementById('RulesM')as HTMLElement; */
    /* RulesM.classList.toggle('hidden'); */
    RulesM.setAttribute('class', 'hidden');
}

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.player = void 0;
/**
 * Classe représentant un joueur.
 */
class player {
    /**
     * Constructeur de la classe. Le joueur reçoit 10 billes.
     * @param playerName le nom du joueur.
     * @param matricule le matricule qui lui sera attribué.
     */
    constructor(playerName, matricule) {
        this.initMarbles = 10; //nombre de billes initiales
        this.begin = false;
        this.colorMarbles = []; //couleurs des billes du joueur
        this.marbles = this.initMarbles;
        this.name = playerName;
        this.matricule = matricule;
        this.marblesBet = 0;
        this.gainedOrLost = 0;
        this.initColors();
    }
    /**
     * Garde nom et matricule du joueur, reset le reste.
     * Change le joueur qui commence.
     */
    reset() {
        this.marbles = this.initMarbles;
        this.initColors();
        this.marblesBet = 0;
        this.gainedOrLost = 0;
        this.begin = !this.begin;
    }
    /**
     * Attribue un numéro de couleur de bille aléatoire entre 1 et 9
     * Ce numéro sera relié aux marbles[1..9].png
     */
    initColors() {
        for (let i = 0; i < 2 * this.initMarbles; i++) {
            this.colorMarbles.push(Math.floor(Math.random() * 9) + 1);
        }
    }
    /**
     *
     * @returns le matricule du joueur formatté sur 3 chiffres
     */
    getMatricule() {
        let m = this.matricule.toString();
        return ("000" + m).slice(-3);
    }
    ;
    /**
     * Le joueur mise une ou plusieurs billes.
     * @param marbles le nombre de billes misées
     */
    bet(marbles) {
        console.log(this.name + " bet " + marbles);
        if (marbles > this.marbles) {
            throw new Error(`Le nombre de billes pariées (${marbles}) est supérieur au nombre de billes restantes (${this.marbles}).`);
        }
        if (marbles <= 0) {
            throw new Error("Le nombre de billes misées doit être supérieur à 0 !");
        }
        this.marblesBet = marbles;
    }
    /**
     * Le joueur devine si la mise du player2 est paire ou impaire
     * Le nombre de billes de chaque joueur est mis à jour en conséquence
     * @param choice le choix entre pair ou impair
     * @param player2 le joueur dont on doit deviner la mise (marblesBet)
     * @returns vrai si bien deviné (gain), faux sinon (perte)
     */
    guess(choice, player2) {
        if (player2.marblesBet == 0) {
            throw new Error(`Le player2 (matricule ${player2.getMatricule()}) n'a pas misé de billes !`);
        }
        let victoire;
        if (choice == "even") {
            victoire = (player2.marblesBet % 2 == 0);
        }
        else {
            victoire = (player2.marblesBet % 2 != 0);
        }
        if (victoire) {
            player2.marbles -= player2.marblesBet;
            this.marbles += player2.marblesBet; //le joueur gagne les billes misées
            this.gainedOrLost = player2.marblesBet;
            player2.gainedOrLost = -player2.marblesBet;
        }
        else {
            let perte = player2.marblesBet;
            if (perte > this.marbles)
                perte = this.marbles;
            player2.marbles += perte;
            this.marbles -= perte; //le joueur perd les billes misées
            this.gainedOrLost = -perte;
            player2.gainedOrLost = perte;
        }
        player2.marblesBet = 0;
        return victoire;
    }
    /**
     *
     * @returns true si le player n'a plus de billes, false sinon.
     */
    isDead() {
        return (this.marbles <= 0);
    }
}
exports.player = player;
/**
 * Exemples d'utilisation
let p1 = new player("hervé", 1);
let p2 = new player("jc", 456);
console.log(p1.getMatricule());
p2.bet(4);
if(p1.guess("odd", p2)) {
    console.log("p1 a gagné");
} else {
    console.log("p1 a perdu");
}
console.log(p1);
console.log(p2);
p1.bet(3);
if (p2.guess("impair", p1)) {
    console.log("p2 a bien deviné un nombre pair et gagne.");
};
 */

},{}]},{},[3,1,2]);
