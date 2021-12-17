import {player} from "./Player";

let p1 = new player("moi",123);
let p2 = new player("lui",345)

console.log("p2 mise 4 billes");
p2.bet(4);
console.log("p1 devine pair");
if (p1.guess("even", p2)) {
    console.log(`p1 a gagné, il a ${p1.marbles} billes, et p2 en a ${p2.marbles}.`);
} else {
    console.log("p1 a perdu ?");
}
console.log("p1 mise 3 billes");
p1.bet(7);
console.log("p2 devine impair");
if (p2.guess("even", p1)) {
    console.log(`p2 a gagné, il a ${p2.marbles} billes, et p1 en a ${p1.marbles}.`);
} else {
    console.log(`p2 a perdu, il a ${p2.marbles} billes, et p1 en a ${p1.marbles}.`);
}
