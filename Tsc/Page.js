"use strict";
class Page {
}
/*     versionplayer:string;
    selectPlayerDisplay:void;
    index:any;
    game:string[]=[];
    player1:string;
    player2:string;
 */
function StartPlayer() {
    let index;
    index = document.getElementById('homePage');
    index.style.display = "none";
    let selectPlayerDisplay;
    selectPlayerDisplay = document.getElementById('selectPlayers');
    selectPlayerDisplay.removeAttribute('class', 'hidden');
    console.log("test start");
}
function SelectNumberPlayer(chooseP) {
    let versionplayer;
    versionplayer = chooseP;
    let displayname;
    localStorage.setItem('Type', versionplayer);
    if (versionplayer === "solo") {
        displayname = document.getElementById('username1');
        displayname.removeAttribute('class', 'hidden');
        return versionplayer;
    }
    else {
        displayname = document.getElementById('username1');
        displayname.removeAttribute('class', 'hidden');
        displayname = document.getElementById('username2');
        displayname.removeAttribute('class', 'hidden');
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
