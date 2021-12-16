//local storage
localStorage.setItem('monChat', 'Tom');
var cat = localStorage.getItem('myCat');

let marblesInput = (<HTMLInputElement>document.getElementById('numberOfMarbles'));




// selectionner le nombre bille 
let marblesNbr: number = 0
let PlayerRemainingMarbles: number = 10;
let IARemainingMarbles: number = 10;

function getMarblesNbr(){
    let marblesNbr: number = 0;
    marblesNbr = +marblesInput.value;
    return marblesNbr;   
}

// function bille restantes

function remainingMarbles() {
    
}

// function pair ou impair

function evenOrOdd() {
    let marblesNbr: number = getMarblesNbr();
    if (marblesNbr % 2 === 0) {
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
    if(randomEvenOrOdd === 0){
        return randomEvenOrOdd       
    } else {
        return randomEvenOrOdd  
    }
}

