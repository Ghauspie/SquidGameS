(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
//local storage
localStorage.setItem('monChat', 'Tom');
var cat = localStorage.getItem('myCat');
let marblesInput = document.getElementById('numberOfMarbles');
// selectionner le nombre bille 
let marblesNbr = 0;
let PlayerRemainingMarbles = 10;
let IARemainingMarbles = 10;
function getMarblesNbr() {
    let marblesNbr = 0;
    marblesNbr = +marblesInput.value;
    return marblesNbr;
}
// function bille restantes
function remainingMarbles() {
}
// function pair ou impair
function evenOrOdd() {
    let marblesNbr = getMarblesNbr();
    if (marblesNbr % 2 === 0) {
        return true;
    }
    else {
        return false;
    }
}
// Ia function random nombre de bille
function randomMarblesNumber() {
    let randomMarbles = Math.floor(Math.random() * 20);
    console.log(randomMarbles);
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

},{}],2:[function(require,module,exports){
"use strict";
class player {
    constructor(playerName, matricule) {
        this.marbles = 10; //Chaque joueur a 10 billes au départ
        this.name = playerName;
        this.matricule = matricule;
        this.marblesBet = 0;
    }
    getMatricule() {
        return "001";
    }
    ;
    bet(marbles) {
        this.marblesBet = marbles;
    }
    guess(pair, player2) {
        this.marbles += player2.marblesBet;
        return true;
    }
    isDead() {
        return (this.marbles <= 0);
    }
}
//Exemples d'utilisation
// let p1 = new player("hervé", 1);
// let p2 = new player("jc", 456);
// console.log(p1.getNumber());
// p1.bet(3);
// if (p2.guess(true, p1)) {
//     console.log("p2 a bien deviné un nombre pair et gagne" + p1.marbles);
// };s

},{}]},{},[2,1]);
