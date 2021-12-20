"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
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
let texte;
StartPlay.addEventListener("click", StartPlayer);
SelectSolo.addEventListener("click", SelectNumberPlayer);
SelectMulti.addEventListener("click", SelectNumberPlayer);
Go.addEventListener("click", goplay);
home.addEventListener("click", BackHome);
Rules.addEventListener("click", displayRule);
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
    if (localStorage.type != null) {
        localStorage.removeItem('Type');
        let versionplayer;
        versionplayer = e.target.value;
        let displayname;
        let Name2;
        let username2;
        Name2 = document.getElementById('Name2');
        localStorage.setItem('Type', versionplayer);
        if (versionplayer === "solo") {
            displayname = document.getElementById('username1');
            displayname.removeAttribute('class');
            document.getElementById('Name1').removeAttribute('class');
            if (Name2.getAttribute('class') == null) {
                Name2.setAttribute('class', "hidden");
            }
            return versionplayer;
        }
        else {
            displayname = document.getElementById('username1');
            displayname.removeAttribute('class', 'hidden');
            document.getElementById('Name1').removeAttribute('class');
            displayname = document.getElementById('username2');
            displayname.removeAttribute('class');
            document.getElementById('Name2').removeAttribute('class');
            return versionplayer;
        }
    }
    else {
        let versionplayer;
        versionplayer = e.target.value;
        let displayname;
        let Name2;
        Name2 = document.getElementById('Name2');
        localStorage.setItem('Type', versionplayer);
        if (versionplayer === "solo") {
            displayname = document.getElementById('username1');
            displayname.removeAttribute('class');
            document.getElementById('Name1').removeAttribute('class');
            if (Name2.getAttribute('class') == null) {
                Name2.setAttribute('class', "hidden");
            }
            return versionplayer;
        }
        else {
            displayname = document.getElementById('username1');
            displayname.removeAttribute('class');
            document.getElementById('Name1').removeAttribute('class');
            displayname = document.getElementById('username2');
            displayname.removeAttribute('class');
            document.getElementById('Name2').removeAttribute('class');
            return versionplayer;
        }
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
    HomePage = document.getElementById('homePage');
    HomePage.removeAttribute('class');
    HomePage.setAttribute('class', 'home');
    selectPlayers = document.getElementById('selectPlayers');
    gameChoose = document.getElementById('gameChoice');
    gameGuess = document.getElementById('gameGuess');
    chaningPlayer = document.getElementById('changingPlayer');
    resetLocalStorage;
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
function resetLocalStorage() {
    localStorage.removeItem('Type');
    localStorage.removeItem('name1');
    localStorage.removeItem('playerTurn');
    sessionStorage.removeItem('IsThisFirstTime_Log_From_LiveServer');
}
//function Display rule
function displayRule() {
    let DialogModal = document.getElementById('modalRules');
    if (DialogModal.getAttribute('class') != null) {
        DialogModal.removeAttribute('class', 'hidden');
        DialogModal.removeAttribute('aria-hidden');
        DialogModal.setAttribute('aria-modal', true);
        DialogModal.setAttribute('role', 'dialog');
        document.getElementById('modal-Content').innerHTML = "Le jeux des billes ce joue par deux ou seulement avec le boot. \n Chacun des joueurs obtienne un sac qui contient 10 billes. \n A chaque tours le joueur qui doit deviner mets dans sa main un nombre de billes qui souhaite miser, allant de 1 a 10. Puis il indique si il choisit le nombre pair ou impair. \n Pendant le même temps le second joueur decide combien de billes il met dans sa main. \n Une fois les 2 joueurs prets le joueur qui doit devine indique son choix de pair ou impair. Si il a bien devine, alors il emporte le nombre de bille qu'il avait mise. Puis on inverse les roles. Sinon il donne les billes qu'il avait misé.\n Une fois la partie terminé c'est la fin pour le joueur. Et vous ne reverrez plus jamais la lumiere.";
    }
    else {
        DialogModal.removeAttribute('aria-modal');
        DialogModal.removeAttribute('role');
        DialogModal.setAttribute('aria-hidden', true);
        DialogModal.setAttribute('class', 'hidden');
    }
}
