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
