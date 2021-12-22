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
    addMarblesButtons();
    
    console.log("wait!");
    
    changeStyle("#gameChoice", "background-image", 'url("../Pictures/marblesHand.jpg")');
    
    changeStyle("#gameChoice", "color", "white");
    selectPlayersSection.classList.toggle('hidden');
    gameChoiceSection.classList.toggle('hidden');
    
    //(document.getElementById("gameChoice") as HTMLDivElement).style.backgroundImage = 'url("../Pictures/marblesHand.jpg")';
});
let testButton = document.getElementById("test") as HTMLButtonElement;
testButton.addEventListener("click", () => {
    changeStyle("#gameChoice", "background-image", 'url("../Pictures/marblesHand.jpg")');
})

function changeStyle(selector: string, prop: any, value: string) {
    var styles = document.styleSheets;
    for(let i=0; i<styles.length;i++) {
        let href = document.styleSheets[i].href as string;
        console.log(href);
        if(href!= null && href.indexOf("game.css") != -1) {
            let ruleList = document.styleSheets[i].cssRules;
            console.log(ruleList);
            for (let j = 0; j < ruleList.length; j++) {
                let rule = ruleList[j];
                if (!( rule instanceof CSSStyleRule)) {
                    continue;
                }
                if( rule.selectorText == selector) {
                    console.log("selector " + rule.selectorText);
                    rule.style[prop] = value;
                }
            }
        }
    }
}

  //changeStyle('.good', 'color', 'purple');
  //changeStyle('.bad', 'color', 'yellow');

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
        addMarblesButtons();
        gameChoiceSection.classList.toggle('hidden');
         
    }
});

replayButton.addEventListener('click', () => {
    // p1 = new player(p1.name, parseInt(p1.getMatricule()));
    // IA = new player(IA.name, parseInt(IA.getMatricule()));
});

// ----------------------------- Function VERSUS IA ------------------------------------------------

function playerGuess(p:"even" | "odd"): void{
    result = p1.guess(p, IA);
    playerGuessSection.classList.toggle('hidden');
    playerGuessResultSection.classList.toggle('hidden');
    // Ajouter le text Player guess result section
}

// -------------------------- IA random marbles bet and even or odd-------------------

function randomMarblesNumber(max: number) {
    let randomMarbles: number = Math.floor(Math.random() * max) + 1;
    console.log("Billes pariées par l'IA: ", randomMarbles);
    return randomMarbles
}

function randomEvenOrOdd():"even" | "odd" {
    let randomEvenOrOdd = Math.floor(Math.random() * 2);
    if (randomEvenOrOdd = 0) {
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
    for (let i = 1; i <= p1.marbles; i++) {
        let button = document.createElement("button") as HTMLButtonElement;
        button.innerHTML = `<span class='big'> </span>${i}`;
        button.id = `btnMarble${i}`;
        button.className = `marble marble${p1.colorMarbles[i]}`;
        button.onclick = function () { p1.bet(i) };

        docContext.appendChild(button);
    }
    console.log(`Ajout des ${p1.marbles} billes de ${p1.name}`);
}

