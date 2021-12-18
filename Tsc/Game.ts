import { player } from './Player';

// ------------------------------ BUTTON ---------------------------------------

let GoplayButton = (<HTMLInputElement>document.getElementById('Goplay'));
let myTurnButton = (<HTMLInputElement>document.getElementById('myTurn'));
let validateBetButton = (<HTMLInputElement>document.getElementById('validateChoice'));
let evenButton = (<HTMLInputElement>document.getElementById('even'));
let oddButton = (<HTMLInputElement>document.getElementById('odd'));

// ------------------------------ INPUT ---------------------------------------

let username1Input = (<HTMLInputElement>document.getElementById('username1'));
let username2Input = (<HTMLInputElement>document.getElementById('username2'));
let marblesBetInput = (<HTMLInputElement>document.getElementById('numberOfMarbles'));

// ------------------------------ SECTION ---------------------------------------

let gameChoiceSection = document.getElementById('gameChoice') as HTMLFormElement;
let selectPlayersSection = document.getElementById('selectPlayers') as HTMLFormElement;
let gameGuessSection = document.getElementById('gameGuess') as HTMLFormElement;
let changingPlayerSection = document.getElementById('changingPlayer') as HTMLFormElement;

let displayMarblesP1 = document.getElementById('marblesplayer1') as HTMLFormElement;
let displayMarblesP2 = document.getElementById('marblesplayer1') as HTMLFormElement;

// ------------------------------ LOCAL STORAGE ---------------------------------------

let versionplayer = localStorage.getItem('Type');
let username1: any = localStorage.getItem('name1');
let username2: any = localStorage.getItem('name2');
let playerTurn: any = localStorage.getItem('playerTurn');


// ------------------------------ MATRICULES ---------------------------------------

let matricule1 = Math.floor(Math.random() * 457);
let matricule2 = Math.floor(Math.random() * 457);

// ------------------------------ NEW PLAYERS ---------------------------------------

let p1 = new player(username1, matricule1);
let p2 = new player(username2, matricule2);
let IA = new player("IA", matricule2);


// ------------------------------ VARIABLE GLOBALES ---------------------------------------

// let p1 = new player("moi", 123);
// let p2 = new player("lui", 345)

// console.log("p2 mise 4 billes");
// p2.bet(4);
// console.log("p1 devine pair");
// if (p1.guess("even", p2)) {
//     console.log(`p1 a gagné, il a ${p1.marbles} billes, et p2 en a ${p2.marbles}.`);
// } else {
//     console.log("p1 a perdu ?");
// }
// console.log("p1 mise 3 billes");
// p1.bet(7);
// console.log("p2 devine impair");
// if (p2.guess("even", p1)) {
//     console.log(`p2 a gagné, il a ${p2.marbles} billes, et p1 en a ${p1.marbles}.`);
// } else {
//     console.log(`p2 a perdu, il a ${p2.marbles} billes, et p1 en a ${p1.marbles}.`);
// }
// let button = document.getElementById('testMarbles') as HTMLButtonElement;
// button.addEventListener('click', addMarblesButtons);

function addMarblesButtons() {
    // p1.marbles = Math.floor(Math.random() * 19) + 1;

    console.log(`Ajout des ${p1.marbles} billes de ${p1.name}`);
    let docContext = document.getElementById("btnMarbles") as HTMLDivElement;
    docContext.innerHTML = "";
    for (let i = 1; i <= p1.marbles; i++) {
        let button = document.createElement("button") as HTMLButtonElement;
        button.innerHTML = "<span class='big'> </span>" + i.toString();
        button.id = "btnMarble" + i;
        button.className = "marble marble" + p1.colorMarbles[i];
        button.onclick = function () { p1.bet(i) };

        docContext.appendChild(button);
    }
}

// let selectMode = document.createElement("div");
// selectMode.className = "selectmode";
// selectMode.innerHTML = "Veuillez choisir un mode !";
// selectPlayersSection.append(selectMode);
// console.log("Veuillez choisir un mode");

// ---------------------- Button AddEvenListener -----------------------

GoplayButton.addEventListener('click', () => {
    playerTurn = localStorage.setItem("playerTurn", p1.name);
    if (versionplayer === "") {
        console.log("Veuillez choisir un mode");
    } else if (versionplayer === "solo") {
        console.log("Je joue en solo contre l'IA");
        playerTurn = localStorage.setItem("playerTurn", p1.name);
        selectPlayersSection.setAttribute('class', "hidden");
        gameChoiceSection.removeAttribute('class');
    } else {
        selectPlayersSection.setAttribute('class', "hidden");
        gameChoiceSection.removeAttribute('class');
        getUsername();
    }
})

myTurnButton.addEventListener('click', () => {
})

validateBetButton.addEventListener('click', () => {
    gameChoiceSection.setAttribute('class', "hidden");
    gameGuessSection.removeAttribute('class');

    if (versionplayer === 'solo') {
        gameVsIA();

    } else {
        switchPlayer();
        gameMultiplayers()
    }

})

evenButton.addEventListener('click', () => {
    gameGuessSection.setAttribute('class', "hidden");
    gameChoiceSection.removeAttribute('class');
    p1.guess("even", IA);
    switchPlayer();
    console.log(p1, IA)

})

oddButton.addEventListener('click', () => {
    gameGuessSection.setAttribute('class', "hidden");
    gameChoiceSection.removeAttribute('class');
    switchPlayer();
    p1.guess("odd", IA);
    console.log(p1, IA)


})

// ----------------------------- Function VERSUS IA ------------------------------------------------

function gameVsIA() {
    playerTurn = localStorage.getItem('playerTurn');
    if (IA.marbles <= 0) {
        alert("C'est gagné !!");    
    } else if (p1.marbles === 0) {
        alert("C'est perdu !");
    } else {
        if (playerTurn === p1.name) {
            p1.bet(+marblesBetInput.value)
            if (evenOrOdd() === randomEvenOrOdd()) {
                console.log("IA a trouvé la solution");
                IA.guess("odd", p1);
            } else {
                console.log("IA n'a pas trouvé la solution");
                IA.guess("even", p1);
            }
        } else {
            let randomBetIA: any = randomMarblesNumber(IA.marbles);
            IA.bet(randomBetIA);
            console.log("IA bet : ", randomBetIA);
        }
    }
    if (IA.marbles != 0) {
        let randomBetIA: any = randomMarblesNumber(IA.marbles);
        IA.bet(randomBetIA);
        console.log("IA bet : ", randomBetIA);
    }
    console.log(p1, IA)
    switchPlayer();
}
// ----------------------Game 1 V 1--------------------------------

function gameMultiplayers() {
    playerTurn = localStorage.getItem('playerTurn');
    if (playerTurn === p1.name) {
        let betMarbles = marblesBetInput.value;
        p1.bet(+betMarbles);
    } else if (playerTurn === p2.name) {
        let betMarbles = marblesBetInput.value;
        p2.bet(+betMarbles)
        console.log("Tour de : ", p2.name);
    }
}


// ------------------- Username ----------------------

function getUsername() {
    let username1 = username1Input.value;
    let username2 = username2Input.value;
    localStorage.setItem('name1', username1);
    localStorage.setItem('name2', username2);
    console.log(p1, p2);
}

function switchPlayer() {
    versionplayer == localStorage.getItem('Type');
    if (versionplayer === 'solo') {
        playerTurn = localStorage.getItem('playerTurn');
        if (playerTurn === p1.name) {
            playerTurn = localStorage.setItem("playerTurn", "IA");
        } else if (playerTurn === "IA") {
            playerTurn = localStorage.setItem("playerTurn", p1.name);
        }
    } else if (versionplayer === 'multiplayers') {
        playerTurn = localStorage.getItem('playerTurn');
        if (playerTurn === p1.name) {
            playerTurn = localStorage.setItem("playerTurn", p2.name);
        } else {
            playerTurn = localStorage.setItem("playerTurn", p1.name);
        }
    }
}

function evenOrOdd() {
    let betMarbles = marblesBetInput.value;
    if (+betMarbles % 2 === 0) {
        return "even";
    } else {
        return "odd";
    }

}


function randomMarblesNumber(max: number) {
    let randomMarbles: number = Math.floor(Math.random() * max) + 1;
    console.log(randomMarbles);

    console.log("billes pariées par l'IA: ", randomMarbles);
    return randomMarbles
}

// ia function random pair/impair 

function randomEvenOrOdd() {
    let randomEvenOrOdd: number = Math.floor(Math.random() * 2)

    if (randomEvenOrOdd === 1) {
        console.log("IA dit pair");
        return "even"
    } else {
        console.log("IA dit Impair");
        return "odd"
    }
}

