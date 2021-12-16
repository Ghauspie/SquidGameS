let marblesInput = (<HTMLInputElement>document.getElementById('numberOfMarbles'));

// selectionner le nombre bille 
let marblesNbr: number = 0
let PlayerRemainingMarbles: number = 10;
let IARemainingMarbles: number = 10;
let playerTurn: string = "player1";
let marblesBet: number;

function game() {
    let marblesBet: number = getMarblesNbr()
    console.log(marblesBet);
    if (playerTurn === "player1") {
        console.log("Tour du ", playerTurn);
        playerTurn = "IA";
        marblesNbr = PlayerRemainingMarbles;
    } else {
        console.log("Tour de ", playerTurn);
        playerTurn = "player1"
        marblesNbr = IARemainingMarbles;
    }

}

function getMarblesNbr() {
    let marblesNbr: number = 0;
    marblesNbr = +marblesInput.value;
    return marblesNbr;
}

// function bille restantes

function remainingMarbles() {

}

// function pair ou impair
let evenInput = (<HTMLInputElement>document.getElementById('even'));
let oddInput = (<HTMLInputElement>document.getElementById('odd'));
let evenOrOddChoice: string = '';

function selectEvenOrOdd(choice: number) {
    let marblesBet: number = getMarblesNbr()
    if(PlayerRemainingMarbles <= 0){
        console.log("Game OVER");     
    } else {
        if (getMarblesNbr() == 0) {
            console.log("veuillez choisir un nombre de bille à parier");
        } else {
            if (choice == 0) {
                let evenOrOddChoice = "even";
                console.log(evenOrOddChoice);
                if (evenOrOdd()) {
                    PlayerRemainingMarbles += marblesBet;
                    IARemainingMarbles -= marblesBet;
                    console.log("Nombre de billes restantes:", PlayerRemainingMarbles);
                    console.log("gagné");
                } else {
                    PlayerRemainingMarbles -= marblesBet;
                    IARemainingMarbles += marblesBet;
                    console.log("Nombre de billes restantes:", PlayerRemainingMarbles);
                    console.log("perdu");
                }
            } else if (choice == 1) {
                let evenOrOddChoice = "odd";
                console.log(evenOrOddChoice);
                if (evenOrOdd()) {
                    PlayerRemainingMarbles -= marblesBet;
                    IARemainingMarbles += marblesBet;
                    console.log("Nombre de billes restantes:", PlayerRemainingMarbles);
                    console.log("perdu");
    
                } else {
                    PlayerRemainingMarbles += marblesBet;
                    IARemainingMarbles -= marblesBet;
                    console.log("Nombre de billes restantes:", PlayerRemainingMarbles);
                    console.log("gagné");
                }
                return evenOrOddChoice;
            }
        }
    }
}
function evenOrOdd() {
    let marblesNbr: number = getMarblesNbr();
    if (marblesNbr % 2 === 0) {
        ;
        return true;
    } else {
        return false;
    }
}


// Ia function random nombre de bille

function randomMarblesNumber() {
    let randomMarbles: number = Math.floor(Math.random() * 20)
    console.log(randomMarbles)
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

