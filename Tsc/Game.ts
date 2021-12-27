import { player } from './Player';

// ------------------------------ BUTTON ---------------------------------------

const goPlayButton = document.getElementById('goPlay') as HTMLButtonElement;
const startPlayButton = document.getElementById("start") as HTMLButtonElement;
const toIAGuessButton = document.getElementById('toIAGuess') as HTMLButtonElement;
const evenButton = document.getElementById('even') as HTMLButtonElement;
const oddButton = document.getElementById('odd') as HTMLButtonElement;
const toIABetButton = document.getElementById('toIABet') as HTMLButtonElement;
const toPlayerGuessButton = document.getElementById('toPlayerGuess') as HTMLButtonElement;
const toPlayerBetButton = document.getElementById('toPlayerBet') as HTMLButtonElement;
const replayButton = document.getElementById('replay') as HTMLButtonElement;

// ------------------------------ SECTION ---------------------------------------

const homePage = document.getElementById('homePage') as HTMLDivElement;
const gameChoiceSection = document.getElementById('gameChoice') as HTMLDivElement;
const IAGuessSection = document.getElementById('IAGuess') as HTMLDivElement;
const playerGuessSection = document.getElementById('playerGuess') as HTMLDivElement;
const selectPlayersSection = document.getElementById('selectPlayers') as HTMLDivElement;
const gameOverSection = document.getElementById('gameOver') as HTMLDivElement;
const IABetSection = document.getElementById('IABet') as HTMLDivElement;
const playerGuessResultSection = document.getElementById('playerGuessResult') as HTMLDivElement;

const titleGameChoice = document.getElementById('titleGameChoice') as HTMLDivElement;
const resultGameChoice = document.getElementById('resultGameChoice') as HTMLDivElement;
const titleIAGuess = document.getElementById('titleIAGuess') as HTMLDivElement;
const resultIAGuess = document.getElementById('resultIAGuess') as HTMLDivElement;
const titleGameOver = document.getElementById('titleGameOver') as HTMLDivElement;
const resultGameOver = document.getElementById('resultGameOver') as HTMLDivElement;
const titleIABet = document.getElementById('titleIABet') as HTMLDivElement;
const resultIABet = document.getElementById('resultIABet') as HTMLDivElement;
const titlePlayerGuess = document.getElementById('titlePlayerGuess') as HTMLDivElement;
const titlePlayerGuessResult = document.getElementById('titlePlayerGuessResult') as HTMLDivElement;
const resultPlayerGuessResult = document.getElementById('resultPlayerGuessResult') as HTMLDivElement;

// ------------------------------ MATRICULES ---------------------------------------

let matricule2 = Math.floor(Math.random() * 456) + 1;

// ------------------------------ NEW PLAYERS ---------------------------------------

let p1: player;
let IA: player;

// ------------------------------ VARIABLE GLOBALES ---------------------------------------

let result: boolean;

/**
 * Retour à la page d'acceuil, en cachant toutes les autres sections.
 */
export function resetAll() {
    homePage.classList.remove('hidden');
    gameChoiceSection.classList.add('hidden');
    IAGuessSection.classList.add('hidden');
    IABetSection.classList.add('hidden');
    playerGuessSection.classList.add('hidden');
    selectPlayersSection.classList.add('hidden');
    gameOverSection.classList.add('hidden');
    playerGuessResultSection.classList.add('hidden');
    changeStyle("game.css", "#selectPlayers", "background-image", "url('../Pictures/selectPlayersBackground.png')" );
    changeStyle("game.css", "#gameChoice", "background-image", "url('../Pictures/gameChoiceBackground.png')");
    changeStyle("game.css", "#IAGuess", "background-image", "url('../Pictures/IAGuessBackground.png')" );
    changeStyle("game.css", "#IABet", "background-image", "url('../Pictures/IABetBackground.png')" );
    changeStyle("game.css", "#playerGuess", "background-image", "url('../Pictures/playerGuessBackground.png')" );
    changeStyle("game.css", "#gameOverSection", "background-image", "url('../Pictures/gameOverSection.png')" );
    changeStyle("game.css", "#playerGuessResultSection", "background-image", "url('../Pictures/playerGuessResultSection.png')" );
}


//Pour le changement de background-image avec une animation.
//Le div doit être visible à l'écran au moment de l'appel
//Il faut donc utiliser un setTimeout() avant appel pour voir l'effet de transition
/**
 * Change la valeur d'une propriété dans un style.
 * Exemple, changeStyle("game.css", ".title", "color", "white")
 * Ira changer dans le fichier de style game.css référencé le style ".title",
 * et changera "color: xxx" en "color: white" 
 * @param cssFile nom du fichier de style à modifier
 * @param selector nom du sélecteur CSS recherché
 * @param prop propriété à changer dans le sélecteur (doit exister)
 * @param value valeur à attribuer au sélecteur
 */
 function changeStyle(cssFile: string, selector: string, prop: any, value: string) {
    var styles = document.styleSheets;
    for( let i = 0; i <styles.length; i++) {
        let href = document.styleSheets[i].href as string;
        if( href != null && href.indexOf(cssFile) != -1 ) {
            let ruleList = document.styleSheets[i].cssRules;
            for (let r = 0; r < ruleList.length; r++) {
                let rule = ruleList[r];
                if (!( rule instanceof CSSStyleRule)) {
                    continue;
                }
                if( rule.selectorText == selector) {
                    //Pour une raison étrange prop doit être any
                    rule.style[prop] = value;
                }
            }
        }
    }
}
// ---------------------- Button AddEvenListener -----------------------

/**
 * Bouton sur la page d'acceuil, passe à l'écran de sélection du joueur
 */
startPlayButton.addEventListener("click",()=> {
    homePage.classList.add("hidden");
    selectPlayersSection.classList.remove("hidden");
    setTimeout( changeStyle, 10, "game.css", "#selectPlayers", "background-image", "url('../Pictures/selectPlayers.jpg')" );
});

/**
 * Crée les players et détermine au hasard qui commence.
 * Affiche ensuite l'écran pour player1 ou IA.
 */
goPlayButton.addEventListener('click', () => {
    const username1 = document.getElementById("username1") as HTMLInputElement;
    p1 = new player(username1.value, 456);
    IA = new player("Oh Il-Nam", 1);
    changeStyle("game.css", "#selectPlayers", "background-image", "url('../Pictures/selectPlayersBackground.png')" );
    selectPlayersSection.classList.add('hidden');
    //On tire au sort celui qui commence
    if( randomEvenOrOdd() === "even" ) {
        //Le joueur commence
        p1.begin = true;
        IA.begin = false;
        addMarblesButtons();
        titleGameChoice.innerHTML = `MATRICULE ${p1.getMatricule()} CHOISI TA MISE.`;
        gameChoiceSection.classList.remove('hidden');
        setTimeout( changeStyle, 10, "game.css", "#gameChoice", "background-image", "url('../Pictures/gameChoice.jpg')" );
    } else {
        //IA commence
        p1.begin = false;
        IA.begin = true;
        IABetSection.classList.remove('hidden');
        titleIABet.innerHTML = `MATRICULE ${IA.getMatricule()} PARIE`;
        resultIABet.innerHTML = `${IA.name} A FAIT SON CHOIX.`;
        setTimeout( changeStyle, 10, "game.css", "#IABet", "background-image", "url('../Pictures/IABet.jpg')" );
    }
});

/**
 * Appel depuis l'écran gameChoice du player 1
 * IA devine au hasard complet
 * Si le joueur n'a pas misé de billes, soulève une exception, et informe le joueur
 */
toIAGuessButton.addEventListener('click', () => {
    try {
        let pairImpair = randomEvenOrOdd();
        result = IA.guess(pairImpair, p1); //throw error if no marbles bet by p1
        gameChoiceSection.classList.add('hidden');
        IAGuessSection.classList.remove('hidden');
        let s = ( IA.gainedOrLost > 1 ) ? "s" : ""; //billes au pluriel ?
        titleIAGuess.innerHTML = `MATRICULE <strong>${IA.getMatricule()}</strong> A CHOISI <strong>${pairImpair == "even" ? "PAIR" : "IMPAIR"}.</strong>`;
        resultIAGuess.innerHTML = result ? `${IA.name} gagne <strong>${IA.gainedOrLost}</strong> bille${s} !` : `${IA.name} perd <strong>${p1.gainedOrLost}</strong> bille${s} !`;
        changeStyle("game.css", "#gameChoice", "background-image", "url('../Pictures/gameChoiceBackground.png')");
        if( result ) {
            setTimeout( changeStyle, 10, "game.css", "#IAGuess", "background-image", "url('../Pictures/IAGuessWin.jpg')" );
        } else {
            setTimeout( changeStyle, 10, "game.css", "#IAGuess", "background-image", "url('../Pictures/IAGuessLoose.jpg')" );
        }
    } catch (error) {
        resultGameChoice.innerHTML = `${p1.name}, clique d'abord sur une bille pour miser !`;
    }
});

/**
 * Une fois que l'IA a gagné ou perdu sur pair|impair, elle fait semblant de miser.
 */
toIABetButton.addEventListener('click', () => {
    changeStyle("game.css", "#IAGuess", "background-image", "url('../Pictures/IAGuessBackground.png')" );
    IAGuessSection.classList.add('hidden');
    if( p1.isDead() || IA.isDead() ) {
        updateGameOver();
        gameOverSection.classList.remove('hidden');
        setTimeout( changeStyle, 10, "game.css", "#gameOver", "background-image", "url('../Pictures/gameOver.jpg')" );
    } else {
        IABetSection.classList.remove('hidden');
        titleIABet.innerHTML = `MATRICULE ${IA.getMatricule()} PARIE`;
        resultIABet.innerHTML = `${IA.name} A FAIT SON CHOIX.`;
        setTimeout( changeStyle, 10, "game.css", "#IABet", "background-image", "url('../Pictures/IABet.jpg')" );
    }
});

/**
 * IA mise un nombre de billes.
 * Le joueur doit deviner la mise de l'IA, et a deux boutons pair | impair
 */
toPlayerGuessButton.addEventListener('click', () => {
    changeStyle( "game.css", "#IABet", "background-image", "url('../Pictures/IABetBackground.png')" );
    IABetSection.classList.add('hidden');
    playerGuessSection.classList.remove('hidden');
    titlePlayerGuess.innerHTML = `${p1.getMatricule()} TU DOIS DEVINER`;
    //pas de result, mais les deux boutons
    IA.bet(randomMarblesNumber(IA.marbles));
    setTimeout( changeStyle, 10, "game.css", "#playerGuess", "background-image", "url('../Pictures/playerGuess.jpg')" );
});

evenButton.addEventListener( 'click', () => playerGuess("even") );

oddButton.addEventListener( 'click', () => playerGuess("odd") );

/**
 * Appel par clic sur bouton, affiche le résultat du choix du joueur.
 * @param pairOuImpair le choix du joueur
 */
function playerGuess(pairOuImpair:"even" | "odd"): void {
    changeStyle("game.css", "#playerGuess", "background-image", "url('../Pictures/playerGuessBackground.png')" );
    result = p1.guess(pairOuImpair, IA);
    let s = ( p1.gainedOrLost > 1 ) ? "s" : ""; //billes au pluriel ?
    titlePlayerGuessResult.innerHTML = result ? `MATRICULE ${p1.getMatricule()} TU AS BIEN CHOISI.` : `MAUVAIS CHOIX, MATRICULE ${p1.getMatricule()}.`;
    resultPlayerGuessResult.innerHTML = result ? `${p1.name} gagne ${p1.gainedOrLost} bille${s} !` : `${p1.name} perd ${IA.gainedOrLost} bille${s} !`;
    playerGuessSection.classList.add('hidden');
    playerGuessResultSection.classList.remove('hidden');
    if( result ) {
        setTimeout( changeStyle, 10, "game.css", "#playerGuessResult", "background-image", "url('../Pictures/playerGuessResultWin.jpg')" );
    } else {
        setTimeout( changeStyle, 10, "game.css", "#playerGuessResult", "background-image", "url('../Pictures/playerGuessResultLoose.jpg')" );
    }
}

/**
 * Retour à l'écran de mise pour joueur 1
 */
toPlayerBetButton.addEventListener('click', () => {
    changeStyle("game.css", "#playerGuessResult", "background-image", "url('../Pictures/playerGuessResultBackground.png')" );
    playerGuessResultSection.classList.add('hidden');
    if(p1.isDead() || IA.isDead()) {
        updateGameOver();
        gameOverSection.classList.remove('hidden');
        setTimeout( changeStyle, 10, "game.css", "#gameOver", "background-image", "url('../Pictures/gameOver.jpg')" );
    } else {
        addMarblesButtons();
        titleGameChoice.innerHTML = `MATRICULE ${p1.getMatricule()} CHOISI TA MISE.`;
        resultGameChoice.innerHTML = ""; //rappel de clic sur bille
        gameChoiceSection.classList.remove('hidden');
        setTimeout( changeStyle, 10, "game.css", "#gameChoice", "background-image", "url('../Pictures/gameChoice.jpg')" );
    }
});

/**
 * Si le joueur 1 a commencé, c'est l'IA qui commence, et inversement.
 */
replayButton.addEventListener('click', () => {
    changeStyle("game.css", "#gameOver", "background-image", "url('../Pictures/gameOverBackground.png')" );
    gameOverSection.classList.add('hidden');
    p1.reset();
    IA.reset();
    if ( IA.begin ) {
        IABetSection.classList.remove('hidden');
        setTimeout( changeStyle, 10, "game.css", "#IABet", "background-image", "url('../Pictures/IABet.jpg')" );
    } else {
        gameChoiceSection.classList.remove('hidden');
        addMarblesButtons();
        titleGameChoice.innerHTML = `MATRICULE ${p1.getMatricule()} CHOISI TA MISE.`;
        gameChoiceSection.classList.remove('hidden');
        setTimeout( changeStyle, 10, "game.css", "#gameChoice", "background-image", "url('../Pictures/gameChoice.jpg')" );
    }
});

/**
 * Met à jour les infos dans section#GameOver
 */
function updateGameOver() {
    console.log(`p1.tours = ${p1.getTours()}, IA.tours = ${IA.getTours()}`);
    titleGameOver.innerHTML = p1.isDead() ? "GAME OVER !" : "VICTOIRE !";
    resultGameOver.innerHTML = p1.isDead() ? `JOUEUR MATRICULE ${p1.getMatricule()}, VOUS AVEZ PERDU.` : `BRAVO JOUEUR MATRICULE ${p1.getMatricule()}, VOUS GAGNEZ CETTE PARTIE.`;
}

// -------------------------- IA random marbles bet and even or odd-------------------

/**
 * Limite un peu le hasard.
 * @param billes le nombre de billes de l'IA
 * @returns le nombre de billes misées
 */
function randomMarblesNumber(billes: number) {
    let randomMarbles: number;
    let max: number;
    let d100 = Math.floor(Math.random() * 100);
    if( d100 < 10 ) {
        //ce fou parie éventuellement toutes ses billes...
        max = billes;
    } else if( d100 < 40 ) {
        //parfois jusqu'à 60% de ses billes
        max = Math.round(billes * 6 / 10);
    } else {
        //le plus souvent, jusqu'à 30% de ses billes pour faire durer le plaisir
        max = Math.round(billes * 3 / 10);
    }
    console.log("mise max " + max);
    randomMarbles = Math.floor(Math.random() * max) + 1;
    console.log("Billes pariées par l'IA: ", randomMarbles);
    return randomMarbles;
}
/**
 * Pair ou impair au hasard
 * @returns "even" ou "odd"
 */
function randomEvenOrOdd():"even" | "odd" {
    let randomEvenOrOdd = Math.round(Math.random());
    if (randomEvenOrOdd === 0) {
        console.log("IA dit pair");
        return "even";
    } else {
        console.log("IA dit Impair");
        return "odd";
    }
}

// ---------------------- marbles buttons  ---------------

/**
 * Ajoute les billes du joueur 1 dans le div#btnMarbles
 */
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

