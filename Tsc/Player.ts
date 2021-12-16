let Player1: string;
let player2: string;
let matricule1:number;
let matricule2:number;
let username1:string|number;
let username2:string|number;


function StartPlayer(){
    let selectPlayerDisplay:any;
    let index:any;
    index=document.getElementById('homePage');
    index.setAttribute('class','hidden');
    selectPlayerDisplay=document.getElementById('selectPlayers');
    selectPlayerDisplay.removeAttribute('class','hidden');

    console.log("test start");
}