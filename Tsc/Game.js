"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
// let marblesInput = (<HTMLInputElement>document.getElementById('numberOfMarbles'));
// let evenInput = (<HTMLInputElement>document.getElementById('even'));
// let oddInput = (<HTMLInputElement>document.getElementById('odd'));
// // selectionner le nombre bille 
// let marblesNbr: number = 0
// let PlayerRemainingMarbles: number = 10;
// let IARemainingMarbles: number = 10;
// let marblesBet: number;
// let playerTurn: string = "player1";
// let evenOrOddChoice: string = '';
// function game() {
//     let marblesBet: number = getMarblesNbr()
//     console.log(marblesBet);
//     if (playerTurn === "player1") {
//         console.log("Tour du ", playerTurn);
//         playerTurn = "IA";
//         marblesNbr = PlayerRemainingMarbles;
//     } else {
//         console.log("Tour de ", playerTurn);
//         playerTurn = "player1"
//         marblesNbr = IARemainingMarbles;
//     }
// }
// function getMarblesNbr() {
//     let marblesNbr: number = 0;
//     marblesNbr = +marblesInput.value;
//     return marblesNbr;
// }
// // function pair ou impair
// function selectEvenOrOdd(choice: number) {
//     let marblesBet: number = getMarblesNbr()
//     if(PlayerRemainingMarbles <= 0){
//         PlayerRemainingMarbles = 0;
//         console.log("Game OVER");     
//     } else if (PlayerRemainingMarbles >= 20){
//         PlayerRemainingMarbles = 20;
//         console.log("Vous avez gagné");
//     } else {
//         if (getMarblesNbr() == 0) {
//             console.log("veuillez choisir un nombre de bille à parier");
//         } else {
//             if (choice == 0) {
//                 let evenOrOddChoice = "even";
//                 console.log(evenOrOddChoice);
//                 if (evenOrOdd()) {
//                     PlayerRemainingMarbles += marblesBet;
//                     IARemainingMarbles -= marblesBet;
//                     console.log("Nombre de billes restantes:", PlayerRemainingMarbles);
//                     console.log("gagné");
//                     if(PlayerRemainingMarbles >= 20){
//                         PlayerRemainingMarbles = 20;
//                         console.log("Vous avez gagné");     
//                     }
//                 } else {
//                     PlayerRemainingMarbles -= marblesBet;
//                     IARemainingMarbles += marblesBet;
//                     console.log("Nombre de billes restantes:", PlayerRemainingMarbles);
//                     console.log("perdu");
//                     if(PlayerRemainingMarbles <= 0){
//                         PlayerRemainingMarbles = 0;
//                         console.log("Game OVER");     
//                     }
//                 }
//             } else if (choice == 1) {
//                 let evenOrOddChoice = "odd";
//                 console.log(evenOrOddChoice);
//                 if (evenOrOdd()) {
//                     PlayerRemainingMarbles -= marblesBet;
//                     IARemainingMarbles += marblesBet;
//                     console.log("Nombre de billes restantes:", PlayerRemainingMarbles);
//                     console.log("perdu");
//                     if(PlayerRemainingMarbles <= 0){
//                         PlayerRemainingMarbles = 0;
//                         console.log("Game OVER");     
//                     }
//                 } else {
//                     PlayerRemainingMarbles += marblesBet;
//                     IARemainingMarbles -= marblesBet;
//                     console.log("Nombre de billes restantes:", PlayerRemainingMarbles);
//                     console.log("gagné");
//                     if(PlayerRemainingMarbles >= 20){
//                         PlayerRemainingMarbles = 20;
//                         console.log("Vous avez gagné");     
//                     }
//                 }
//                 return evenOrOddChoice;
//             }
//         }
//     }
// }
// function evenOrOdd() {
//     let marblesNbr: number = getMarblesNbr();
//     if (marblesNbr % 2 === 0) {
//         ;
//         return true;
//     } else {
//         return false;
//     }
// }
// // Ia function random nombre de bille
// function IA(){   
//     if(playerTurn == "IA"){
//     }
// }
// function randomMarblesNumber() {
//     let randomMarbles: number = Math.floor(Math.random() * 20)
//     console.log(randomMarbles)
//     return randomMarbles;
// }
// // ia function random pair/impair 
// function randomEvenOrOdd() {
//     let randomEvenOrOdd: number = Math.floor(Math.random() * 2)
//     if (randomEvenOrOdd === 0) {
//         return randomEvenOrOdd
//     } else {
//         return randomEvenOrOdd
//     }
// }
let p1 = new Player_1.player("hervé", 1);
let p2 = new Player_1.player("jc", 456);
console.log(p1.getMatricule());
p2.bet(4);
if (p1.guess("impair", p2)) {
    console.log("gagné");
}
else {
    console.log("perdu");
}
console.log(p1);
console.log(p2);
p1.bet(3);
console.log(p1);
