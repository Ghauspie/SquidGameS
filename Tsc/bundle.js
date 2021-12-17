(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./Player":2}],2:[function(require,module,exports){
"use strict";
/**
 * Classe représentant un joueur.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.player = void 0;
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
            throw new Error("Le nombre de billes misées doit être supérieur ou égal à 0 !");
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
        if (choice == "pair") {
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
            player2.marbles += player2.marblesBet;
            this.marbles -= player2.marblesBet; //le joueur perd les billes misées
        }
        player2.marblesBet = 0; //pas forcément indispensable
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
// if (p2.guess(true, p1)) {
//     console.log("p2 a bien deviné un nombre pair et gagne.");
// };

},{}]},{},[2,1]);
