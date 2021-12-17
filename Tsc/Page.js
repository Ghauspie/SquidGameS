"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
StartPlay.addEventListener("click", StartPlayer);
SelectSolo.addEventListener("click", SelectNumberPlayer);
SelectMulti.addEventListener("click", SelectNumberPlayer);
Go.addEventListener("click", goplay);
home.addEventListener("click", BackHome);
Rules.addEventListener("click", displayRule);
function StartPlayer() {
    let index;
    let selectPlayerDisplay;
    index = document.getElementById('homePage');
    index.setAttribute('class', "hidden");
    /*  index.style.display="none"; */
    selectPlayerDisplay = document.getElementById('selectPlayers');
    selectPlayerDisplay.removeAttribute('class', 'hidden');
    console.log("test start");
}
function SelectNumberPlayer(e) {
    let versionplayer;
    versionplayer = e.target.value;
    let displayname;
    localStorage.setItem('Type', versionplayer);
    if (versionplayer === "solo") {
        displayname = document.getElementById('username1');
        displayname.removeAttribute('class', 'hidden');
        document.getElementById('Name1').removeAttribute('class');
        return versionplayer;
    }
    else {
        displayname = document.getElementById('username1');
        displayname.removeAttribute('class', 'hidden');
        document.getElementById('Name1').removeAttribute('class');
        displayname = document.getElementById('username2');
        displayname.removeAttribute('class', 'hidden');
        document.getElementById('Name2').removeAttribute('class');
        return versionplayer;
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
    }
    else {
        player1 = document.getElementById('username1').value;
        player2 = document.getElementById('username2').value;
        localStorage.setItem('name1', player1);
        localStorage.setItem('name2', player2);
    }
}
function BackHome() {
    let HomePage;
    let selectPlayers;
    let gameChoose;
    let gameGuess;
    let chaningPlayer;
    HomePage = document.getElementById('homePage');
    HomePage.removeAttribute('class');
    HomePage.setAttribute('class', 'home');
    selectPlayers = document.getElementById('selectPlayers');
    gameChoose = document.getElementById('gameChoice');
    gameGuess = document.getElementById('gameGuess');
    chaningPlayer = document.getElementById('changingPlayer');
    if (selectPlayers.getAttribute('class') == null) {
        selectPlayers.setAttribute('class', "hidden");
    }
    if (gameChoose.getAttribute('class') == null) {
        gameChoose.setAttribute('class', 'hidden');
    }
    if (gameGuess.getAttribute('class') == null) {
        gameGuess.setAttribute('class', 'hidden');
    }
    if (chaningPlayer.getAttribute('class') == null) {
        chaningPlayer.setAttribute('class', 'hidden');
    }
}
function displayRule() {
    let DialogModal = document.getElementById('DialogModal').showModal();
    console.log('test');
}
