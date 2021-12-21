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
    let randomEvenOrOdd = Math.floor(Math.random());
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
let RulesM = document.getElementsByClassName('RulesM');
/*  document.addEventListener("click", function (e) {
      if(DialogModal.getAttribute('role')== "dialog"){
          let pathevent=e.path[1]; */
/* pathevent=console.log(pathevent); */
/*              console.log(pathevent);
            console.log(DialogModal, e.path[1]);
            if(pathevent.indexOf("<div class=\"modal-card>") ||pathevent.indexOf("<div id=\"modalRules\">")) */
/* if (pathevent.) */ {
    /* e.stopPropagation(); */
    /*                 console.log("test lol du click")
                }else {
                    closeRules;
                }
              }
             },
                 false);   */
    /*   window.onclick = function(event) {
        let DialogModal:HTMLElement=document.getElementById('modalRules');
            if(DialogModal.getAttribute('role')== "dialog"){
            let modal:HTMLElement=document.getElementById('modalRules');
             let modalCard=document.querySelector('modal-card');
             console.log(event.target);
                if (event.target ==modal) {
                    modal.setAttribute('class','hidden');
                    console.log("test");
                }
                else{
                }
            }
        }  */
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
        HomePage = document.getElementById('homePage');
        /*  HomePage.classList.toggle('hidden'); */
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
        /* selectPlayers.classList.toggle('hidden'); */
        resetLocalStorage;
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
        localStorage.removeItem('Type');
        localStorage.removeItem('name1');
        localStorage.removeItem('playerTurn');
        sessionStorage.removeItem('IsThisFirstTime_Log_From_LiveServer');
    }
    //function Display rule
    function displayRule() {
        let RulesM = document.getElementById('RulesM');
        RulesM.classList.toggle('hidden');
        let DialogModal = document.getElementById('modalRules');
        DialogModal.classList.toggle('hidden');
    }
    function closeRules() {
        let DialogModal = document.getElementById('modalRules');
        DialogModal.removeAttribute('aria-modal');
        DialogModal.removeAttribute('role');
        DialogModal.setAttribute('aria-hidden', true);
        DialogModal.setAttribute('class', 'hidden');
        let RulesM = document.getElementById('RulesM');
        RulesM.classList.toggle('hidden');
        /* RulesM.setAttribute('class','hidden'); */
    }
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
        this.colorMarbles = []; //couleurs des billes du joueur
        this.marbles = this.initMarbles;
        this.name = playerName;
        this.matricule = matricule;
        this.marblesBet = 0;
        this.gainedOrLost = 0;
        this.initColors();
    }
    /**
     * Garde nom et matricule du joueur, reset le reste
     */
    reset() {
        this.marbles = this.initMarbles;
        this.initColors();
        this.marblesBet = 0;
        this.gainedOrLost = 0;
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
