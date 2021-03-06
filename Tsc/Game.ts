import { player } from './Player';

// ------------------------------ BUTTON ---------------------------------------

let GoplayButton = (<HTMLButtonElement>document.getElementById('Goplay'));
let validateBetButton = (<HTMLButtonElement>document.getElementById('validateChoice'));
let evenButton = (<HTMLButtonElement>document.getElementById('even'));
let oddButton = (<HTMLButtonElement>document.getElementById('odd'));
let toIABetButton = document.getElementById('toIABet') as HTMLButtonElement;
let toPlayerGuessButton = document.getElementById('toPlayerGuess') as HTMLButtonElement;
let toPlayerBetButton = document.getElementById('toPlayerBet') as HTMLButtonElement;
let replayButton = document.getElementById('replay') as HTMLButtonElement;
let backToHomePageButton = document.getElementById('backToHomePage') as HTMLButtonElement;



let usernameInput = document.getElementById('username1') as HTMLInputElement;
// ------------------------------ SECTION ---------------------------------------

let gameChoiceSection = document.getElementById('gameChoice') as HTMLElement;
let IAGuessSection = document.getElementById('IAGuess') as HTMLElement;
let playerGuessSection = document.getElementById('playerGuess') as HTMLElement;
let selectPlayersSection = document.getElementById('selectPlayers') as HTMLElement;
let gameOverSection = document.getElementById('gameOver') as HTMLElement;
let IABetSection = document.getElementById('IABet') as HTMLElement;
let playerGuessResultSection = document.getElementById('playerGuessResult') as HTMLElement;

// ---------------------------------TEXTE------------------------------------------------

// let titlePlayerBetChoice = document.getElementById('titlePlayerBetChoice') as HTMLFormElement;

// ------------------------------ LOCAL STORAGE ---------------------------------------

let username1: any;

// ------------------------------ MATRICULES ---------------------------------------

let matricule1 = Math.floor(Math.random() * 456) + 1;
let matricule2 = Math.floor(Math.random() * 456) + 1;

// ------------------------------ NEW PLAYERS ---------------------------------------

let p1 = new player(username1, matricule1);
let IA = new player("IA", matricule2);


// ------------------------------ VARIABLE GLOBALES ---------------------------------------

let result: boolean;
// ---------------------- Button AddEvenListener -----------------------

GoplayButton.addEventListener('click', () => {
    username1 = usernameInput.value;
    console.log(username1)
    document.getElementById('txtPlayerBetChoice')!.innerHTML = `${username1}, ?? vous de miser`;
    document.getElementById('matriculeGameChoice')!.innerHTML = `Joueur n??${matricule1}`;
    selectPlayersSection.classList.toggle('hidden');
    if (randomEvenOrOdd() === "even") {
        localStorage.setItem("begin", "1");
        gameChoiceSection.classList.toggle('hidden');
        addMarblesButtons();
    } else {
        localStorage.setItem("begin", "2");
        IABetSection.classList.toggle('hidden');
        // L'adversaire commence
    }
});

validateBetButton.addEventListener('click', () => {
    document.getElementById('matriculeGameChoice')!.innerHTML = `Joueur ${matricule1} `;
    if (p1.marblesBet === 0) {
        document.getElementById('titlePlayerBetChoice')!.innerHTML = `Veuillez choisir un nombre de billes ?? parier !`  
    } else {
    gameChoiceSection.classList.toggle('hidden');
    IAGuessSection.classList.toggle('hidden');
    let p = randomEvenOrOdd();
    result = IA.guess(p, p1);
    document.getElementById('titleIAGuess')!.innerHTML = `Joueur <strong>${matricule2}</strong>`;
    if(result) {
        IAGuessSection.style.backgroundImage = "url('./Pictures/IAGuessWin.jpg')";
        document.getElementById('resultIAGuess')!.innerHTML = `L'adversaire a choisi <strong>${p == "even" ? "Pair" : "Impair"}</strong>, il a gagn?? <strong>${IA.gainedOrLost}</strong> billes!`;
    } else {
        IAGuessSection.style.backgroundImage = "url('./Pictures/IAGuessLoose.jpg')";
        document.getElementById('resultIAGuess')!.innerHTML = `L'adversaire a choisi <strong>${p == "even" ? "Pair" : "Impair"}</strong>, il a perdu <strong>${p1.gainedOrLost}</strong> billes!`;
    }    
    }
});

toIABetButton.addEventListener('click', () => {
    document.getElementById('titleIABet')!.innerHTML = `Joueur n??${matricule1}`;
    IAGuessSection.classList.toggle('hidden');
    if (p1.isDead()) {
        gameOverSection.style.backgroundImage = "url('./Pictures/squidgame_gun.png')";
        document.getElementById('tittleWinOrLoose')!.innerHTML = `Game Over !`;
        document.getElementById('txtWinOrLoose')!.innerHTML = `Joueur n??${matricule1}, vous avez perdu !`;
        gameOverSection.classList.toggle('hidden');
    } else if (IA.isDead()) {
        gameOverSection.style.backgroundImage = "url('./Pictures/background_victory.jpeg')";
        document.getElementById('tittleWinOrLoose')!.innerHTML = `Victoire !`;
        document.getElementById('txtWinOrLoose')!.innerHTML = `Bravo Joueur n??${matricule1}, vous avez gagn?? !`;
        gameOverSection.classList.toggle('hidden');
    }
     else {
        document.getElementById('guessIAEvenOrOdd')!.innerHTML = `L'adversaire a pari?? un nombre de billes. ?? vous de deviner  !`;
        IABetSection.classList.toggle('hidden');
    }
});

toPlayerGuessButton.addEventListener('click', () => {
    document.getElementById('titlePlayerGuess')!.innerHTML = `Joueur n??${matricule1}`;
    IABetSection.classList.toggle('hidden');
    playerGuessSection.classList.toggle('hidden');
    IA.bet(randomMarblesNumber(IA.marbles));

});

evenButton.addEventListener('click', () => {
    playerGuess("even");
    document.getElementById('titlePlayerGuessResult')!.innerHTML = `${username1}, vous avez choisi <strong>Pair</strong>`;
});

oddButton.addEventListener('click', () => {
    playerGuess("odd");
    document.getElementById('titlePlayerGuessResult')!.innerHTML = `${username1}, vous avez choisi <strong>Impair</strong>`;
});

toPlayerBetButton.addEventListener('click', () => {
    playerGuessResultSection.classList.toggle('hidden');
    if (p1.isDead()) {
        gameOverSection.style.backgroundImage = "url('./Pictures/squidgame_gun.png')";
        document.getElementById('tittleWinOrLoose')!.innerHTML = `Game Over !`;
        document.getElementById('txtWinOrLoose')!.innerHTML = `Joueur n??${matricule1}, vous avez perdu !`;
        gameOverSection.classList.toggle('hidden');
    } else if (IA.isDead()) {
        gameOverSection.style.backgroundImage = "url('./Pictures/background_victory.jpeg')";
        document.getElementById('tittleWinOrLoose')!.innerHTML = `Victoire !`;
        document.getElementById('txtWinOrLoose')!.innerHTML = `Bravo Joueur n??${matricule1}, vous avez gagn?? !`;
        gameOverSection.classList.toggle('hidden');
    } else {
        gameChoiceSection.classList.toggle('hidden');
        addMarblesButtons();
    }
});

backToHomePageButton.addEventListener('click', () => {
    p1.reset();
    IA.reset();
})

replayButton.addEventListener('click', () => {
    gameOverSection.classList.toggle('hidden');
    p1.reset();
    IA.reset();
    let beginner = localStorage.getItem("begin");
    if (beginner === "1") {
        localStorage.setItem("begin", "2");
        IABetSection.classList.toggle('hidden');
    } else {
        localStorage.setItem("begin", "1");
        gameChoiceSection.classList.toggle('hidden');
        addMarblesButtons();
    }

});

// ----------------------------- Function VERSUS IA ------------------------------------------------

function playerGuess(p: "even" | "odd"): void {
    result = p1.guess(p, IA);
    if(result) {
        playerGuessResultSection.setAttribute("style", "background-image: url(./Pictures/playerGuessResultWin.jpg)");
        document.getElementById('txtPlayerGuessResult')!.innerHTML = `Vous avez gagn?? <strong>${p1.gainedOrLost}</strong> billes!`;
    } else {
        playerGuessResultSection.setAttribute("style", "background-image: url(./Pictures/playerGuessResultLoose.jpg)");
        document.getElementById('txtPlayerGuessResult')!.innerHTML = `Vous avez perdu <strong>${IA.gainedOrLost}</strong> billes!`;
    } 
    playerGuessSection.classList.toggle('hidden');
    playerGuessResultSection.classList.toggle('hidden');
    // Ajouter le text Player guess result section
}

// -------------------------- IA random marbles bet and even or odd-------------------

function randomMarblesNumber(max: number): number {
    let randomMarbles: number = Math.floor(Math.random() * max) + 1;
    console.log("Billes pari??es par l'IA: ", randomMarbles);
    return randomMarbles
}

function randomEvenOrOdd(): "even" | "odd" {
    if (Math.round(Math.random()) === 0) {
        console.log("IA dit pair");
        return "even"
    } else {
        console.log("IA dit Impair");
        return "odd"
    }
}

// ---------------------- marbles buttons  ---------------

function addMarblesButtons() {
    let docContext = document.getElementById("btnMarbles") as HTMLDivElement;
    docContext.innerHTML = "";
    console.log("nombre de billes de p1 :", p1.marbles);

    for (let i = 1; i <= p1.marbles; i++) {
        let button = document.createElement("button") as HTMLButtonElement;
        button.innerHTML = "<span class='big'> </span>" + i.toString();
        button.id = "btnMarble" + i;
        button.className = "marble marble" + p1.colorMarbles[i];
        button.onclick = function () { p1.bet(i) };

        docContext.appendChild(button);
    }
    console.log(`Ajout des ${p1.marbles} billes de ${username1}`);
}

