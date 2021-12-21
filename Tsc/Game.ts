import { player } from './Player';

// ------------------------------ BUTTON ---------------------------------------

let GoplayButton = (<HTMLInputElement>document.getElementById('Goplay'));
let validateBetButton = (<HTMLInputElement>document.getElementById('validateChoice'));
let evenButton = (<HTMLInputElement>document.getElementById('even'));
let oddButton = (<HTMLInputElement>document.getElementById('odd'));
let toIABetButton = document.getElementById('toIABet') as HTMLButtonElement;
let toPlayerGuessButton = document.getElementById('toPlayerGuess') as HTMLButtonElement;
let toPlayerBetButton = document.getElementById('toPlayerBet') as HTMLButtonElement;
let replayButton = document.getElementById('replay') as HTMLButtonElement;

// ------------------------------ SECTION ---------------------------------------

let gameChoiceSection = document.getElementById('gameChoice') as HTMLFormElement;
let IAGuessSection = document.getElementById('IAGuess') as HTMLFormElement;
let playerGuessSection = document.getElementById('playerGuess') as HTMLFormElement;
let selectPlayersSection = document.getElementById('selectPlayers') as HTMLFormElement;
let gameOverSection = document.getElementById('gameOver') as HTMLFormElement;
let IABetSection = document.getElementById('IABet') as HTMLFormElement;
let playerGuessResultSection = document.getElementById('playerGuessResult') as HTMLFormElement;

// ---------------------------------TEXTE------------------------------------------------

let titlePlayerBetChoice = document.getElementById('titlePlayerBetChoice') as HTMLFormElement;

// ------------------------------ LOCAL STORAGE ---------------------------------------

let username1: any = localStorage.getItem('name1');

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
    selectPlayersSection.classList.toggle('hidden');
    document.getElementById('titlePlayerBetChoice')!.innerHTML = `${p1.name}<br> matricule : ${matricule1} !<br> Veuillez choisir un nombre de bille a parier !`
    if(randomEvenOrOdd() === "even"){
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
    gameChoiceSection.classList.toggle('hidden');
    IAGuessSection.classList.toggle('hidden');
    let p = randomEvenOrOdd();
    result = IA.guess(p, p1);
    document.getElementById('titleIAGuess')!.innerHTML = `${IA.name} a choisi ${p=="even"?"pair":"impair"}`;
    document.getElementById('resultIAGuess')!.innerHTML = result?"Il gagne !":"Il perd !";
});

toIABetButton.addEventListener('click', () => {
    IAGuessSection.classList.toggle('hidden');
    if(p1.isDead() || IA.isDead()) {
        gameOverSection.classList.toggle('hidden');
    } else {
        IABetSection.classList.toggle('hidden');
        // Compléter le texte à afficher dans la section
    }
});

toPlayerGuessButton.addEventListener('click', () => {
    IABetSection.classList.toggle('hidden');
    playerGuessSection.classList.toggle('hidden');
    IA.bet(randomMarblesNumber(IA.marbles));

});

evenButton.addEventListener('click', () => {
    playerGuess("even");
});

oddButton.addEventListener('click', () => {
    playerGuess("odd");
});

toPlayerBetButton.addEventListener('click', () => {
    playerGuessResultSection.classList.toggle('hidden');
    if(p1.isDead()|| IA.isDead()){
        gameOverSection.classList.toggle('hidden');
    } else {
        gameChoiceSection.classList.toggle('hidden');
        addMarblesButtons(); 
    }
});

replayButton.addEventListener('click', () => {
    gameOverSection.classList.toggle('hidden');
    p1.reset();
    IA.reset();
    let beginner = localStorage.getItem("begin");
    if (beginner === "1"){
        localStorage.setItem("begin", "2");
        IABetSection.classList.toggle('hidden');
    } else {
        localStorage.setItem("begin", "1");
        gameChoiceSection.classList.toggle('hidden');   
        addMarblesButtons();
    }

});

// ----------------------------- Function VERSUS IA ------------------------------------------------

function playerGuess(p:"even" | "odd"): void{
    result = p1.guess(p, IA);
    playerGuessSection.classList.toggle('hidden');
    playerGuessResultSection.classList.toggle('hidden');
    // Ajouter le text Player guess result section
}

// -------------------------- IA random marbles bet and even or odd-------------------

function randomMarblesNumber(max: number): number {
    let randomMarbles: number = Math.floor(Math.random() * max) + 1;
    console.log("Billes pariées par l'IA: ", randomMarbles);
    return randomMarbles
}

function randomEvenOrOdd():"even" | "odd" {
    let randomEvenOrOdd = Math.floor(Math.random());
    if (randomEvenOrOdd === 0) {
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
    console.log("nombre de billes de p1 :",p1.marbles);
    
    for (let i = 1; i <= p1.marbles; i++) {
        let button = document.createElement("button") as HTMLButtonElement;
        button.innerHTML = "<span class='big'> </span>" + i.toString();
        button.id = "btnMarble" + i;
        button.className = "marble marble" + p1.colorMarbles[i];
        button.onclick = function () { p1.bet(i) };

        docContext.appendChild(button);
    }
    console.log(`Ajout des ${p1.marbles} billes de ${p1.name}`);
}

