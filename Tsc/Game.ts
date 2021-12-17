import { player } from './Player';

let players = getUsername();
let p1 = players[0];
let p2 = players[1];

let playerTurn: any = p1;

let GoplayButton = (<HTMLInputElement>document.getElementById('Goplay'));
let myTurnButton = (<HTMLInputElement>document.getElementById('myTurn'));
let validateChoiceButton = (<HTMLInputElement>document.getElementById('validateChoice'));
let evenButton = (<HTMLInputElement>document.getElementById('even'));
let oddButton = (<HTMLInputElement>document.getElementById('odd'));

// ---------------------- Button AddEvenListener -----------------------

GoplayButton.addEventListener('click', () => {
    getUsername();
})
myTurnButton.addEventListener('click', () => {
    switchPlayer();
})
validateChoiceButton.addEventListener('click', () => {
    betMarbles();
})
evenButton.addEventListener('click', () => {
    guess();
})
oddButton.addEventListener('click', () => {
    guess();
})

// ------------------- Username ----------------------

function getUsername() {
    let username1Input = (<HTMLInputElement>document.getElementById('username1'));
    let username2Input = (<HTMLInputElement>document.getElementById('username2'));
    let username1 = username1Input.value;
    let username2 = username2Input.value;
    let p1 = new player(username1, Math.floor(Math.random() * 457));
    let p2 = new player(username2, Math.floor(Math.random() * 457));
    console.log(p1, p2);
    return [p1, p2];
}

function switchPlayer() {
    console.log(p1)
    if (playerTurn === p1) {
        playerTurn = p2;
    } else {
        playerTurn = p1;
    }
}

function betMarbles() {
    let marblesBetInput = (<HTMLInputElement>document.getElementById('numberOfMarbles'));
    let betMarbles = marblesBetInput.value;
    if (playerTurn === p1) {
        p1.bet(+betMarbles)
        console.log(p1)
        if (+betMarbles % 2 === 0) {
            console.log("Pair");
            return "even";
        } else {
            console.log("impair");
            return "odd";
        }
    } else {
        p2.bet(+betMarbles)
        console.log(+betMarbles);
        if (+betMarbles % 2 === 0) {
            console.log("Pair");
            return "even";
        } else {
            console.log("impair");
            return "odd";
        }
    }
}

function guess() {  
    if (playerTurn === p1) {
        if (p1.guess(betMarbles(), p2)) {
            console.log("gagné");
        } else {
            console.log("perdu");
        }
    } else {
        if (p2.guess(betMarbles(), p1)) {
            console.log("gagné");
        } else {
            console.log("perdu");
        }
    }
}

function randomMarblesNumber() {
    let randomMarbles: number = Math.floor(Math.random() * 20)
    return randomMarbles;
}

// ia function random pair/impair 

function randomEvenOrOdd() {
    let randomEvenOrOdd: number = Math.floor(Math.random() * 2)
    if (randomEvenOrOdd === 0) {
        return randomEvenOrOdd
    } else {
        return randomEvenOrOdd
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


