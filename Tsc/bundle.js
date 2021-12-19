(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
// ------------------------------ BUTTON ---------------------------------------
let GoplayButton = document.getElementById('Goplay');
let myTurnButton = document.getElementById('myTurn');
let validateBetButton = document.getElementById('validateChoice');
let evenButton = document.getElementById('even');
let oddButton = document.getElementById('odd');
let marblesButton = document.getElementById('testMarbles');
// ------------------------------ INPUT ---------------------------------------
let username1Input = document.getElementById('username1');
let username2Input = document.getElementById('username2');
let marblesBetInput = document.getElementById('numberOfMarbles');
// ------------------------------ SECTION ---------------------------------------
let gameChoiceSection = document.getElementById('gameChoice');
let selectPlayersSection = document.getElementById('selectPlayers');
let gameGuessSection = document.getElementById('gameGuess');
let changingPlayerSection = document.getElementById('changingPlayer');
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
// ---------------------- Button AddEvenListener -----------------------
marblesButton.addEventListener('click', addMarblesButtons);
GoplayButton.addEventListener('click', () => {
    versionPlayer = localStorage.getItem('Type');
    if (versionPlayer === "") {
        console.log("Veuillez choisir un mode");
    }
    else if (versionPlayer === "solo") {
        playerTurn = localStorage.setItem("playerTurn", p1.name);
        selectPlayersSection.setAttribute('class', "hidden");
        gameChoiceSection.removeAttribute('class');
        addMarblesButtons();
        console.log(p1, IA);
    }
    else if (versionPlayer === "multiplayers") {
        playerTurn = localStorage.setItem("playerTurn", p1.name);
        selectPlayersSection.setAttribute('class', "hidden");
        gameChoiceSection.removeAttribute('class');
        getUsername();
        addMarblesButtons();
        console.log(p1, p2);
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
        console.log(p1, p2);
        gameMultiplayers();
    }
});
evenButton.addEventListener('click', () => {
    versionPlayer = localStorage.getItem('Type');
    gameGuessSection.setAttribute('class', "hidden");
    gameChoiceSection.removeAttribute('class');
    if (versionPlayer === "solo") {
        p1.guess("even", IA);
        console.log(p1, IA);
    }
    else if (versionPlayer === "multiplayers") {
        console.log(p1, p2);
        playerTurn = localStorage.getItem('playerTurn');
        if (playerTurn = p1.name) {
            p1.guess("even", p2);
        }
        else if (playerTurn = p2.name) {
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
        console.log(p1, IA);
    }
    else if (versionPlayer === "multiplayers") {
        console.log(p1, p2);
        playerTurn = localStorage.getItem('playerTurn');
        if (playerTurn === p1.name) {
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
            addMarblesButtons();
            // p1.bet(+marblesBetInput.value)
            if (evenOrOdd() === randomEvenOrOdd()) {
                console.log("IA a trouvé la solution");
                IA.guess("even", p1);
            }
            else {
                console.log("IA n'a pas trouvé la solution");
                IA.guess("odd", p1);
            }
        }
        else if (playerTurn = IA) {
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
}
// ----------------------Game 1 V 1--------------------------------
function gameMultiplayers() {
    playerTurn = localStorage.getItem('playerTurn');
    if (p1.marbles = 0) {
        console.log(`${p1.name} a perdu !`);
        console.log(`${p2.name} a gagné !`);
    }
    else if (p2.marbles = 0) {
        console.log(`${p1.name} a gagné !`);
        console.log(`${p2.name} a perdu !`);
    }
    else {
        if (playerTurn === p1.name) {
            addMarblesButtons();
            // let betMarbles = marblesBetInput.value;
            // p1.bet(+betMarbles);  
            // console.log(p1);
            // console.log(`Joueur 1 mise : ${betMarbles}`)
            switchPlayer();
        }
        else if (playerTurn === p2.name) {
            addMarblesButtons();
            // let betMarbles = marblesBetInput.value;
            // p2.bet(+betMarbles)
            // console.log(p2);
            // console.log(`Joueur 2 mise : ${betMarbles}`)   
            switchPlayer();
        }
    }
}
// ------------------- username in local storage ----------------------
function getUsername() {
    let username1 = username1Input.value;
    let username2 = username2Input.value;
    localStorage.setItem('name1', username1);
    localStorage.setItem('name2', username2);
    console.log(p1, p2);
}
// ------------------------------- Switch players ---------------------------------------------
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
//--------------------- Even or odd -------------------------------------
function evenOrOdd() {
    let betMarbles = marblesBetInput.value;
    if (+betMarbles % 2 === 0) {
        return "even";
    }
    else {
        return "odd";
    }
}
// -------------------------- IA random marbles bet and even or odd-------------------
function randomMarblesNumber(max) {
    let randomMarbles = Math.floor(Math.random() * max) + 1;
    console.log(randomMarbles);
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
    playerTurn = localStorage.getItem('playerTurn');
    if (playerTurn = p1.name) {
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
    else if (playerTurn = p2.name) {
        let docContext = document.getElementById("btnMarbles");
        docContext.innerHTML = "";
        for (let i = 1; i <= p2.marbles; i++) {
            let button = document.createElement("button");
            button.innerHTML = "<span class='big'> </span>" + i.toString();
            button.id = "btnMarble" + i;
            button.className = "marble marble" + p2.colorMarbles[i];
            button.onclick = function () { p2.bet(i); };
            docContext.appendChild(button);
        }
        console.log(`Ajout des ${p2.marbles} billes de ${p2.name}`);
    }
}

},{"./Player":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
StartPlay.addEventListener("click", StartPlayer);
SelectSolo.addEventListener("click", SelectNumberPlayer);
SelectMulti.addEventListener("click", SelectNumberPlayer);
Go.addEventListener("click", goplay);
home.addEventListener("click", BackHome);
Rules.addEventListener("click", displayRule);
function StartPlayer() {
    let index;
    let selectPlayerDisplay;
    index = document.getElementById('homePage');
    index.setAttribute('class', "hidden");
    /*  index.style.display="none"; */
    selectPlayerDisplay = document.getElementById('selectPlayers');
    selectPlayerDisplay.removeAttribute('class', 'hidden');
    console.log("test start");
}
function SelectNumberPlayer(e) {
    let versionplayer;
    versionplayer = e.target.value;
    let displayname;
    localStorage.setItem('Type', versionplayer);
    if (versionplayer === "solo") {
        displayname = document.getElementById('username1');
        displayname.removeAttribute('class', 'hidden');
        document.getElementById('Name1').removeAttribute('class');
        return versionplayer;
    }
    else {
        displayname = document.getElementById('username1');
        displayname.removeAttribute('class', 'hidden');
        document.getElementById('Name1').removeAttribute('class');
        displayname = document.getElementById('username2');
        displayname.removeAttribute('class', 'hidden');
        document.getElementById('Name2').removeAttribute('class');
        return versionplayer;
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
    }
    else {
        player1 = document.getElementById('username1').value;
        player2 = document.getElementById('username2').value;
        localStorage.setItem('name1', player1);
        localStorage.setItem('name2', player2);
    }
}
function BackHome() {
    let HomePage;
    let selectPlayers;
    let gameChoose;
    let gameGuess;
    let chaningPlayer;
    HomePage = document.getElementById('homePage');
    HomePage.removeAttribute('class');
    HomePage.setAttribute('class', 'home');
    selectPlayers = document.getElementById('selectPlayers');
    gameChoose = document.getElementById('gameChoice');
    gameGuess = document.getElementById('gameGuess');
    chaningPlayer = document.getElementById('changingPlayer');
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
}
function displayRule() {
    let DialogModal = document.getElementById('DialogModal').showModal();
    console.log('test');
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
        // if( player2.marblesBet == 0 ) {
        //     throw new Error(`Le player2 (matricule ${player2.getMatricule()}) n'a pas misé de billes !`);
        // }
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

},{}]},{},[3,1,2]);
