(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    selectPlayersSection.classList.toggle('hidden');
    gameChoiceSection.classList.toggle('hidden');
    addMarblesButtons();
});
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
        gameChoiceSection.classList.toggle('hidden');
        addMarblesButtons();
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

},{"./Player":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
/* import { getDatabase } from "firebase/database"; */
/* const database = getDatabase(); */
/*     versionplayer:string;
    selectPlayerDisplay:void;
    index:any;
    game:string[]=[];
    player1:string;
    player2:string;
 */
let StartPlay = document.getElementById('start');
let SelectSolo = document.getElementById('solo');
let SelectMulti = document.getElementById('multiplayers');
let Go = document.getElementById('Goplay');
let home = document.getElementById('backToHomePage');
let Rules = document.getElementById('rules');
let DialogModal = document.getElementById('modalRules');
let texte;
let ruleClose = document.getElementById('closeRules');
document.addEventListener("click", function (e) {
    console.log(DialogModal.id, e.target.className);
    if ((e.target.className) != (DialogModal.id = "modalRules")) {
        closeRules;
    }
    else {
        closeRules;
    }
}, false);
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
    /*  index.style.display="none"; */
    selectPlayerDisplay = document.getElementById('selectPlayers');
    selectPlayerDisplay.removeAttribute('class');
    console.log("test start");
}
//function select type of game
function SelectNumberPlayer(e) {
    /*  */
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
    let displayname;
    let Name2;
    let username2;
    Name2 = document.getElementById('Name2');
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
        Player_1.player.gameVsIA();
    }
    else {
        player1 = document.getElementById('username1').value;
        player2 = document.getElementById('username2').value;
        localStorage.setItem('name1', player1);
        localStorage.setItem('name2', player2);
        Player_1.player.gameMultiplayers();
    }
}
//Function return home and reset
function BackHome() {
    let HomePage;
    let selectPlayers;
    let gameChoose;
    let gameGuess;
    let chaningPlayer;
    let gameOver;
    HomePage = document.getElementById('homePage');
    HomePage.classList.toggle('hidden');
    HomePage.removeAttribute('class');
    HomePage.setAttribute('class', 'home');
    selectPlayers = document.getElementById('selectPlayers');
    gameChoose = document.getElementById('gameChoice');
    gameGuess = document.getElementById('gameGuess');
    chaningPlayer = document.getElementById('changingPlayer');
    gameOver = document.getElementById('gameOver');
    selectPlayers.classList.toggle('hidden');
    resetLocalStorage;
}
function resetLocalStorage() {
    localStorage.removeItem('Type');
    localStorage.removeItem('name1');
    localStorage.removeItem('playerTurn');
    sessionStorage.removeItem('IsThisFirstTime_Log_From_LiveServer');
    if (selectPlayers.getAttribute('class') == null) {
        selectPlayers.setAttribute('class', "hidden");
    }
    if (gameChoose.getAttribute('class') == null) {
        gameChoose.setAttribute('class', 'hidden');
    }
    if (gameGuess.getAttribute('class') == null) {
        gameGuess.setAttribute('class', 'hidden');
    }
    if (chaningPlayer.getAttribute('class') == null) {
        chaningPlayer.setAttribute('class', 'hidden');
    }
    if (gameOver.getAttribute('class') == null) {
        gameOver.setAttribute('class', 'hidden');
    }
}
//function Display rule
function displayRule() {
    DialogModal = document.getElementById('modalRules');
    if (DialogModal.getAttribute('class') != null) {
        DialogModal.removeAttribute('class', 'hidden');
        DialogModal.removeAttribute('aria-hidden');
        DialogModal.setAttribute('aria-modal', true);
        DialogModal.setAttribute('role', 'dialog');
        document.getElementById('modal-Content').innerHTML = "Le jeux des billes ce joue par deux ou seulement avec le boot.\\n Chacun des joueurs obtienne un sac qui contient 10 billes. \n A chaque tours le joueur qui doit deviner mets dans sa main un nombre de billes qui souhaite miser, allant de 1 a 10. Puis il indique si il choisit le nombre pair ou impair. \n Pendant le même temps le second joueur decide combien de billes il met dans sa main. \n Une fois les 2 joueurs prets le joueur qui doit devine indique son choix de pair ou impair. Si il a bien devine, alors il emporte le nombre de bille qu'il avait mise. Puis on inverse les roles. Sinon il donne les billes qu'il avait misé.\n Une fois la partie terminé c'est la fin pour le joueur. Et vous ne reverrez plus jamais la lumiere.";
    }
    else {
        DialogModal.removeAttribute('aria-modal');
        DialogModal.removeAttribute('role');
        DialogModal.setAttribute('aria-hidden', true);
        DialogModal.setAttribute('class', 'hidden');
    }
}
function closeRules() {
    let DialogModal = document.getElementById('modalRules');
    DialogModal.removeAttribute('aria-modal');
    DialogModal.removeAttribute('role');
    DialogModal.setAttribute('aria-hidden', true);
    DialogModal.setAttribute('class', 'hidden');
}

},{"./Player":3}],3:[function(require,module,exports){
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
        this.colorMarbles = [];
        this.marbles = 10;
        this.name = playerName;
        this.matricule = matricule;
        this.marblesBet = 0;
        this.initColors();
    }
    /**
     * Attribue un numéro de couleur de bille aléatoire entre 1 et 9
     */
    initColors() {
        for (let i = 0; i < 20; i++) {
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
     * Le joueur doit deviner si la mise du player2 est paire ou impaire
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
        }
        else {
            let perte = player2.marblesBet;
            if (perte > this.marbles)
                perte = this.marbles;
            player2.marbles += perte;
            this.marbles -= perte; //le joueur perd les billes misées
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
//Exemples d'utilisation
// let p1 = new player("hervé", 1);
// let p2 = new player("jc", 456);
// console.log(p1.getMatricule());
// p2.bet(4);
// if(p1.guess("impair", p2)) {
//     console.log("gagné");
// } else {
//     console.log("perdu");
// }
// console.log(p1);
// console.log(p2);
// p1.bet(3);
// if (p2.guess("impair", p1)) {
//     console.log("p2 a bien deviné un nombre pair et gagne.");
// };

},{}]},{},[3,2,1]);
