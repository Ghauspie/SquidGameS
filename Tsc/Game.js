"use strict";
let marblesInput = document.getElementById('numberOfMarbles');
// selectionner le nombre bille 
let marblesNbr = 0;
let PlayerRemainingMarbles = 10;
let IARemainingMarbles = 10;
let playerTurn = "player1";
let marblesBet;
function game() {
    let marblesBet = getMarblesNbr();
    console.log(marblesBet);
    if (playerTurn === "player1") {
        console.log("Tour du ", playerTurn);
        playerTurn = "IA";
        marblesNbr = PlayerRemainingMarbles;
    }
    else {
        console.log("Tour de ", playerTurn);
        playerTurn = "player1";
        marblesNbr = IARemainingMarbles;
    }
}
function getMarblesNbr() {
    let marblesNbr = 0;
    marblesNbr = +marblesInput.value;
    return marblesNbr;
}
// function bille restantes
function remainingMarbles() {
}
// function pair ou impair
let evenInput = document.getElementById('even');
let oddInput = document.getElementById('odd');
let evenOrOddChoice = '';
function selectEvenOrOdd(choice) {
    let marblesBet = getMarblesNbr();
    if (PlayerRemainingMarbles <= 0) {
        console.log("Game OVER");
    }
    else {
        if (getMarblesNbr() == 0) {
            console.log("veuillez choisir un nombre de bille à parier");
        }
        else {
            if (choice == 0) {
                let evenOrOddChoice = "even";
                console.log(evenOrOddChoice);
                if (evenOrOdd()) {
                    PlayerRemainingMarbles += marblesBet;
                    IARemainingMarbles -= marblesBet;
                    console.log("Nombre de billes restantes:", PlayerRemainingMarbles);
                    console.log("gagné");
                }
                else {
                    PlayerRemainingMarbles -= marblesBet;
                    IARemainingMarbles += marblesBet;
                    console.log("Nombre de billes restantes:", PlayerRemainingMarbles);
                    console.log("perdu");
                }
            }
            else if (choice == 1) {
                let evenOrOddChoice = "odd";
                console.log(evenOrOddChoice);
                if (evenOrOdd()) {
                    PlayerRemainingMarbles -= marblesBet;
                    IARemainingMarbles += marblesBet;
                    console.log("Nombre de billes restantes:", PlayerRemainingMarbles);
                    console.log("perdu");
                }
                else {
                    PlayerRemainingMarbles += marblesBet;
                    IARemainingMarbles -= marblesBet;
                    console.log("Nombre de billes restantes:", PlayerRemainingMarbles);
                    console.log("gagné");
                }
                return evenOrOddChoice;
            }
        }
    }
}
function evenOrOdd() {
    let marblesNbr = getMarblesNbr();
    if (marblesNbr % 2 === 0) {
        ;
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
