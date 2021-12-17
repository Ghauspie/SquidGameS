"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.player = void 0;
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
exports.player = player;
//Exemples d'utilisation
// let p1 = new player("hervé", 1);
// let p2 = new player("jc", 456);
// console.log(p1.getNumber());
// p1.bet(3);
// if (p2.guess(true, p1)) {
//     console.log("p2 a bien deviné un nombre pair et gagne" + p1.marbles);
// };s
