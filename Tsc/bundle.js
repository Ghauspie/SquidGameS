(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
let players = getUsername();
let p1 = players[0];
let p2 = players[1];
let playerTurn = p1;
let GoplayButton = document.getElementById('Goplay');
let myTurnButton = document.getElementById('myTurn');
let validateChoiceButton = document.getElementById('validateChoice');
let evenButton = document.getElementById('even');
let oddButton = document.getElementById('odd');
// ---------------------- Button AddEvenListener -----------------------
GoplayButton.addEventListener('click', () => {
    getUsername();
});
myTurnButton.addEventListener('click', () => {
    switchPlayer();
});
validateChoiceButton.addEventListener('click', () => {
    betMarbles();
});
evenButton.addEventListener('click', () => {
    guess();
});
oddButton.addEventListener('click', () => {
    guess();
});
// ------------------- Username ----------------------
function getUsername() {
    let username1Input = document.getElementById('username1');
    let username2Input = document.getElementById('username2');
    let username1 = username1Input.value;
    let username2 = username2Input.value;
    let p1 = new Player_1.player(username1, Math.floor(Math.random() * 457));
    let p2 = new Player_1.player(username2, Math.floor(Math.random() * 457));
    console.log(p1, p2);
    return [p1, p2];
}
function switchPlayer() {
    console.log(p1);
    if (playerTurn === p1) {
        playerTurn = p2;
    }
    else {
        playerTurn = p1;
    }
}
function betMarbles() {
    let marblesBetInput = document.getElementById('numberOfMarbles');
    let betMarbles = marblesBetInput.value;
    if (playerTurn === p1) {
        p1.bet(+betMarbles);
        console.log(p1);
        if (+betMarbles % 2 === 0) {
            console.log("Pair");
            return "even";
        }
        else {
            console.log("impair");
            return "odd";
        }
    }
    else {
        p2.bet(+betMarbles);
        console.log(+betMarbles);
        if (+betMarbles % 2 === 0) {
            console.log("Pair");
            return "even";
        }
        else {
            console.log("impair");
            return "odd";
        }
    }
}
function guess() {
    if (playerTurn === p1) {
        if (p1.guess(betMarbles(), p2)) {
            console.log("gagné");
        }
        else {
            console.log("perdu");
        }
    }
    else {
        if (p2.guess(betMarbles(), p1)) {
            console.log("gagné");
        }
        else {
            console.log("perdu");
        }
    }
}
function randomMarblesNumber() {
    let randomMarbles = Math.floor(Math.random() * 20);
    return randomMarbles;
}
// ia function random pair/impair 
function randomEvenOrOdd() {
    let randomEvenOrOdd = Math.floor(Math.random() * 2);
    if (randomEvenOrOdd === 0) {
        return randomEvenOrOdd;
    }
    else {
        return randomEvenOrOdd;
    }
}
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
// console.log(p1);

},{}],2:[function(require,module,exports){
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
        this.marbles = 10;
        this.name = playerName;
        this.matricule = matricule;
        this.marblesBet = 0;
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

},{}]},{},[2,1]);
