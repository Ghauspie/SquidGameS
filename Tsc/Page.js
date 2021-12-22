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
        selectPlayers.setAttribute('class', "hidden");
        gameChoice.setAttribute('class', 'hidden');
        playerGuess.setAttribute('class', 'hidden');
        chaningPlayer.setAttribute('class', 'hidden');
        gameOver.setAttribute('class', 'hidden');
        playerGuessResult.setAttribute('class', 'hidden');
        chaningPlayer.setAttribute('class', 'hidden');
        IAGuess.setAttribute('class', 'hidden');
        IABet.setAttribute('class', 'hidden');
    }
    else {
    function resetLocalStorage() {
        localStorage.removeItem('Type');
        localStorage.removeItem('name1');
        localStorage.removeItem('playerTurn');
        sessionStorage.removeItem('IsThisFirstTime_Log_From_LiveServer');
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
