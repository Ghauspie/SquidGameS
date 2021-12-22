"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* import { getDatabase } from "firebase/database"; */
/* const database = getDatabase(); */
/*     versionplayer:string;
    selectPlayerDisplay:void;
    index:any;
    game:string[]=[];
    player1:string;
    player2:string;
 */
let StartPlay = document.getElementById('start');
let SelectSolo = document.getElementById('solo');
let SelectMulti = document.getElementById('multiplayers');
let Go = document.getElementById('Goplay');
let home = document.getElementById('backToHomePage');
let Rules = document.getElementById('rules');
const DialogModal = document.getElementById('modalRules');
let texte;
let ruleClose = document.getElementById('closeRules');
let RulesM = document.getElementsByClassName('RulesM');
/*  document.addEventListener("click", function (e) {
      if(DialogModal.getAttribute('role')== "dialog"){
          let pathevent=e.path[1]; */
/* pathevent=console.log(pathevent); */
/*              console.log(pathevent);
            console.log(DialogModal, e.path[1]);
            if(pathevent.indexOf("<div class=\"modal-card>") ||pathevent.indexOf("<div id=\"modalRules\">")) */
/* if (pathevent.) */ {
    /* e.stopPropagation(); */
    /*                 console.log("test lol du click")
                }else {
                    closeRules;
                }
              }
             },
                 false);  */
    document.addEventListener("click", function (e) {
        e.stopPropagation();
        if (e.target == DialogModal) {
            console.log('test');
        }
        else {
            RulesM.classList.toggle('hidden');
        }
    });
    /*     window.onclick = function(event) {
            if (event.target == DialogModal) {
                console.log('test');
        }} */
    StartPlay.addEventListener("click", StartPlayer);
    SelectSolo.addEventListener("click", SelectNumberPlayer);
    SelectMulti.addEventListener("click", SelectNumberPlayer);
    Go.addEventListener("click", goplay);
    home.addEventListener("click", BackHome);
    Rules.addEventListener("click", displayRule);
    ruleClose.addEventListener("click", closeRules);
    //function démarrer la préselection pour une partie
    function StartPlayer() {
        let index;
        let selectPlayerDisplay;
        index = document.getElementById('homePage');
        index.setAttribute('class', "hidden");
        /*  index.style.display="none"; */
        selectPlayerDisplay = document.getElementById('selectPlayers');
        selectPlayerDisplay.removeAttribute('class');
        console.log("test start");
    }
<<<<<<< HEAD
    else {
        closeRules;
    }
}, false);
StartPlay.addEventListener("click", StartPlayer);
SelectSolo.addEventListener("click", SelectNumberPlayer);
SelectMulti.addEventListener("click", SelectNumberPlayer);
Go.addEventListener("click", goplay);
home.addEventListener("click", BackHome);
Rules.addEventListener("click", displayRule);
ruleClose.addEventListener("click", closeRules);
//function démarrer la préselection pour une partie
function StartPlayer() {
    let index;
    let selectPlayerDisplay;
    index = document.getElementById('homePage');
    index.setAttribute('class', "hidden");
    /*  index.style.display="none"; */
    selectPlayerDisplay = document.getElementById('selectPlayers');
    selectPlayerDisplay.removeAttribute('class');
    console.log("test start");
}
//function select type of game
function SelectNumberPlayer(e) {
    /*  */
    localStorage.removeItem('Type');
    let displayname1 = document.getElementById('Name1');
    let displayname2 = document.getElementById('Name2');
    if (displayname1.getAttribute("class") !== 'hidden') {
        displayname1.setAttribute('class', 'hidden');
    }
    if (displayname2.getAttribute("class") !== 'hidden') {
        displayname2.setAttribute('class', 'hidden');
    }
    let versionplayer;
    versionplayer = e.target.value;
    let displayname;
    let Name2;
    let username2;
    Name2 = document.getElementById('Name2');
    localStorage.setItem('Type', versionplayer);
    if (versionplayer === "solo") {
        displayname1.classList.toggle('hidden');
    }
    else {
        displayname1.classList.toggle('hidden');
        displayname2.classList.toggle('hidden');
    }
}
function goplay() {
    let player1;
    let player2;
    let versionplayer;
    versionplayer = localStorage.getItem('Type');
    console.log(localStorage.getItem('Type'));
    if (versionplayer === "solo") {
        player1 = document.getElementById('username1').value;
        localStorage.setItem('name1', player1);
        Player_1.player.gameVsIA();
    }
    else {
        player1 = document.getElementById('username1').value;
        player2 = document.getElementById('username2').value;
        localStorage.setItem('name1', player1);
        localStorage.setItem('name2', player2);
        Player_1.player.gameMultiplayers();
    }
}
//Function return home and reset
function BackHome() {
    let HomePage;
    let selectPlayers;
    let gameChoose;
    let gameGuess;
    let chaningPlayer;
    let gameOver;
    HomePage = document.getElementById('homePage');
    HomePage.removeAttributeNS('class', 'hidden');
    HomePage.removeAttribute('class');
    HomePage.setAttribute('class', 'home');
    selectPlayers = document.getElementById('selectPlayers');
    gameChoose = document.getElementById('gameChoice');
    gameGuess = document.getElementById('gameGuess');
    chaningPlayer = document.getElementById('changingPlayer');
    gameOver = document.getElementById('gameOver');
    gameOver.setAttribute('class', 'hidden');
    if (selectPlayers.getAttribute('class') == null) {
=======
    //function select type of game
    function SelectNumberPlayer(e) {
        /*  */
        localStorage.removeItem('Type');
        let displayname1 = document.getElementById('Name1');
        let displayname2 = document.getElementById('Name2');
        if (displayname1.getAttribute("class") !== 'hidden') {
            displayname1.setAttribute('class', 'hidden');
        }
        if (displayname2.getAttribute("class") !== 'hidden') {
            displayname2.setAttribute('class', 'hidden');
        }
        let versionplayer;
        versionplayer = e.target.value;
        let displayname;
        let Name2;
        let username2;
        Name2 = document.getElementById('Name2');
        localStorage.setItem('Type', versionplayer);
        if (versionplayer === "solo") {
            displayname1.classList.toggle('hidden');
        }
        else {
            displayname1.classList.toggle('hidden');
            displayname2.classList.toggle('hidden');
        }
    }
    function goplay() {
        let player1;
        let player2;
        let versionplayer;
        versionplayer = localStorage.getItem('Type');
        console.log(localStorage.getItem('Type'));
        if (versionplayer === "solo") {
            player1 = document.getElementById('username1').value;
            localStorage.setItem('name1', player1);
            // player.gameVsIA();
        }
        else {
            player1 = document.getElementById('username1').value;
            player2 = document.getElementById('username2').value;
            localStorage.setItem('name1', player1);
            localStorage.setItem('name2', player2);
            // player.gameMultiplayers();
        }
    }
    //Function return home and reset
    function BackHome() {
        let HomePage;
        let selectPlayers;
        let gameChoice;
        let playerGuess;
        let playerGuessResult;
        let chaningPlayer;
        let gameOver;
        let IAGuess;
        let IABet;
        HomePage = document.getElementById('homePage');
        /*  HomePage.classList.toggle('hidden'); */
        HomePage.removeAttribute('class');
        HomePage.setAttribute('class', 'home');
        selectPlayers = document.getElementById('selectPlayers');
        gameChoice = document.getElementById('gameChoice');
        playerGuess = document.getElementById('playerGuess');
        chaningPlayer = document.getElementById('changingPlayer');
        gameOver = document.getElementById('gameOver');
        playerGuessResult = document.getElementById('playerGuessResult');
        IAGuess = document.getElementById('IAGuess');
        IABet = document.getElementById('IABet');
        /* selectPlayers.classList.toggle('hidden'); */
        resetLocalStorage;
>>>>>>> dev
        selectPlayers.setAttribute('class', "hidden");
        gameChoice.setAttribute('class', 'hidden');
        playerGuess.setAttribute('class', 'hidden');
        chaningPlayer.setAttribute('class', 'hidden');
<<<<<<< HEAD
    }
    resetLocalStorage;
}
function resetLocalStorage() {
    localStorage.removeItem('Type');
    localStorage.removeItem('name1');
    localStorage.removeItem('playerTurn');
    sessionStorage.removeItem('IsThisFirstTime_Log_From_LiveServer');
}
//function Display rule
function displayRule() {
    DialogModal = document.getElementById('modalRules');
    if (DialogModal.getAttribute('class') != null) {
        DialogModal.removeAttribute('class', 'hidden');
        DialogModal.removeAttribute('aria-hidden');
        DialogModal.setAttribute('aria-modal', true);
        DialogModal.setAttribute('role', 'dialog');
        document.getElementById('modal-Content').innerHTML = "Le jeux des billes ce joue par deux ou seulement avec le boot.\\n Chacun des joueurs obtienne un sac qui contient 10 billes. \n A chaque tours le joueur qui doit deviner mets dans sa main un nombre de billes qui souhaite miser, allant de 1 a 10. Puis il indique si il choisit le nombre pair ou impair. \n Pendant le même temps le second joueur decide combien de billes il met dans sa main. \n Une fois les 2 joueurs prets le joueur qui doit devine indique son choix de pair ou impair. Si il a bien devine, alors il emporte le nombre de bille qu'il avait mise. Puis on inverse les roles. Sinon il donne les billes qu'il avait misé.\n Une fois la partie terminé c'est la fin pour le joueur. Et vous ne reverrez plus jamais la lumiere.";
=======
        gameOver.setAttribute('class', 'hidden');
        playerGuessResult.setAttribute('class', 'hidden');
        chaningPlayer.setAttribute('class', 'hidden');
        IAGuess.setAttribute('class', 'hidden');
        IABet.setAttribute('class', 'hidden');
    }
    function resetLocalStorage() {
        localStorage.removeItem('Type');
        localStorage.removeItem('name1');
        localStorage.removeItem('playerTurn');
        sessionStorage.removeItem('IsThisFirstTime_Log_From_LiveServer');
>>>>>>> dev
    }
    //function Display rule
    function displayRule() {
        let RulesM = document.getElementById('RulesM');
        RulesM.classList.toggle('hidden');
        let DialogModal = document.getElementById('modalRules');
        DialogModal.classList.toggle('hidden');
    }
    function closeRules() {
        let DialogModal = document.getElementById('modalRules');
        DialogModal.removeAttribute('aria-modal');
        DialogModal.removeAttribute('role');
        DialogModal.setAttribute('aria-hidden', true);
        DialogModal.setAttribute('class', 'hidden');
        let RulesM = document.getElementById('RulesM');
        RulesM.classList.toggle('hidden');
    }
}
