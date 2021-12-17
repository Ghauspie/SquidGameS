"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
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
