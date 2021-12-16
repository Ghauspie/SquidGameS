"use strict";
let Player1;
let player2;
let matricule1;
let matricule2;
let username1;
let username2;
function StartPlayer() {
    let selectPlayerDisplay;
    let index;
    index = document.getElementById('homePage');
    index.setAttribute('class', 'hidden');
    selectPlayerDisplay = document.getElementById('selectPlayers');
    selectPlayerDisplay.removeAttribute('class', 'hidden');
    console.log("test start");
}
