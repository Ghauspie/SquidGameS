import {player} from "./Player";
/* import { getDatabase } from "firebase/database"; */

/* const database = getDatabase(); */
/*     versionplayer:string;
    selectPlayerDisplay:void;
    index:any;
    game:string[]=[];
    player1:string;
    player2:string;
 */

    let StartPlay:HTMLElement = document.getElementById('start') as HTMLElement;
    let SelectSolo: HTMLElement= document.getElementById('solo') as HTMLElement;
    let SelectMulti:HTMLElement=document.getElementById('multiplayers') as HTMLElement;
    let Go:HTMLFormElement=document.getElementById('Goplay') as HTMLFormElement;
    let home:HTMLFormElement=document.getElementById('backToHomePage') as HTMLFormElement;
    let Rules:HTMLElement=document.getElementById('rules') as HTMLElement;
    const DialogModal:any=document.getElementById('modalRules');
    let texte:string;
    let ruleClose=document.getElementById('closeRules');
    let RulesM:HTMLElement=document.getElementsByClassName('RulesM');
    
   /*  document.addEventListener("click", function (e) {
         if(DialogModal.getAttribute('role')== "dialog"){
             let pathevent=e.path[1]; */
             /* pathevent=console.log(pathevent); */
/*              console.log(pathevent);
            console.log(DialogModal, e.path[1]);
            if(pathevent.indexOf("<div class=\"modal-card>") ||pathevent.indexOf("<div id=\"modalRules\">")) */
            /* if (pathevent.) */{
                /* e.stopPropagation(); */
/*                 console.log("test lol du click")
            }else {
                closeRules;
            }
          }
         },
             false);  */ 
    document.addEventListener("click", function(e){
        
            e.stopPropagation();
            if (e.target==DialogModal){
                console.log('test');
            }
            else {
                RulesM.classList.toggle('hidden');
            }
            
        

    })
/*     window.onclick = function(event) {
        if (event.target == DialogModal) {
            console.log('test');
    }} */

    StartPlay.addEventListener("click",StartPlayer);
    SelectSolo.addEventListener("click",SelectNumberPlayer);
    SelectMulti.addEventListener("click",SelectNumberPlayer);
    Go.addEventListener("click",goplay);
    home.addEventListener("click",BackHome);
    Rules.addEventListener("click",displayRule);
    ruleClose.addEventListener("click",closeRules);


    
//function démarrer la préselection pour une partie
    function StartPlayer(){
        let index:HTMLElement;
        let selectPlayerDisplay:HTMLElement;
        index=document.getElementById('homePage') as HTMLElement;
        index.setAttribute('class',"hidden");
       /*  index.style.display="none"; */ 
        selectPlayerDisplay=document.getElementById('selectPlayers') as HTMLElement;
        selectPlayerDisplay.removeAttribute('class');
        console.log("test start");
    }

//function select type of game
    function SelectNumberPlayer(e:string){
        /*  */
        localStorage.removeItem('Type');
        let displayname1=document.getElementById('Name1')as HTMLFormElement;
        let displayname2=document.getElementById('Name2') as HTMLFormElement;
        if (displayname1.getAttribute("class")!=='hidden'){
            displayname1.setAttribute('class','hidden');
        }
        if (displayname2.getAttribute("class")!=='hidden'){
            displayname2.setAttribute('class','hidden');
        }
            let versionplayer: string;
            versionplayer=e.target.value;
            let displayname:HTMLFormElement;
            let Name2:HTMLFormElement;
            let username2:HTMLFormElement;
            Name2=document.getElementById('Name2') as HTMLFormElement;
            localStorage.setItem('Type',versionplayer);
            if(versionplayer==="solo"){
                displayname1.classList.toggle('hidden');
            }
            else {
                displayname1.classList.toggle('hidden');
                displayname2.classList.toggle('hidden');
            }
    }

    function goplay(){
        let player1: HTMLFormElement;
        let player2: HTMLFormElement;
        let versionplayer: string;
        versionplayer=localStorage.getItem('Type');
        console.log(localStorage.getItem('Type'));
        if(versionplayer==="solo")
        {
            player1=document.getElementById('username1').value as HTMLFormElement;
            localStorage.setItem('name1',player1);
            // player.gameVsIA();
        }
        else{
            player1=document.getElementById('username1').value as HTMLFormElement;
            player2=document.getElementById('username2').value as HTMLFormElement;
            localStorage.setItem('name1',player1);
            localStorage.setItem('name2',player2);
            // player.gameMultiplayers();
        }
    }
//Function return home and reset
    function BackHome(){
        let HomePage:HTMLElement;
        let selectPlayers:HTMLElement;
        let gameChoice:HTMLElement;
        let playerGuess:HTMLElement;
        let playerGuessResult:HTMLElement
        let chaningPlayer:HTMLElement;
        let gameOver:HTMLElement;
        let IAGuess:HTMLElement;
        let IABet:HTMLElement;

        HomePage=document.getElementById('homePage') as HTMLElement;
       /*  HomePage.classList.toggle('hidden'); */
        HomePage.removeAttribute('class');
        HomePage.setAttribute('class','home'); 
        selectPlayers=document.getElementById('selectPlayers') as HTMLElement;
        gameChoice=document.getElementById('gameChoice') as HTMLElement;
        playerGuess=document.getElementById('playerGuess') as HTMLElement;
        chaningPlayer=document.getElementById('changingPlayer') as HTMLElement;
        gameOver=document.getElementById('gameOver') as HTMLElement;
        playerGuessResult=document.getElementById('playerGuessResult') as HTMLElement;
        IAGuess=document.getElementById('IAGuess') as HTMLElement;
        IABet=document.getElementById('IABet') as HTMLElement;
        /* selectPlayers.classList.toggle('hidden'); */
        resetLocalStorage;
        selectPlayers.setAttribute('class',"hidden");
        gameChoice.setAttribute('class','hidden');
        playerGuess.setAttribute('class','hidden');
        chaningPlayer.setAttribute('class','hidden');
        gameOver.setAttribute('class','hidden');
        playerGuessResult.setAttribute('class','hidden');
        chaningPlayer.setAttribute('class','hidden');
        IAGuess.setAttribute('class','hidden');
        IABet.setAttribute('class','hidden');    
    }
    function resetLocalStorage{
        localStorage.removeItem('Type');
        localStorage.removeItem('name1');
        localStorage.removeItem('playerTurn');
        sessionStorage.removeItem('IsThisFirstTime_Log_From_LiveServer');

    }
//function Display rule
    function displayRule(){
        let RulesM=document.getElementById('RulesM') as HTMLElement;
        RulesM.classList.toggle('hidden');
        let DialogModal:HTMLElement=document.getElementById('modalRules')as HTMLElement;
        DialogModal.classList.toggle('hidden');
    }


    function closeRules(){
        let DialogModal:any=document.getElementById('modalRules');
        DialogModal.removeAttribute('aria-modal');
        DialogModal.removeAttribute('role');
        DialogModal.setAttribute('aria-hidden',true);
        DialogModal.setAttribute('class','hidden');
        let RulesM=document.getElementById('RulesM')as HTMLElement;
        RulesM.classList.toggle('hidden');
        /* RulesM.setAttribute('class','hidden'); */
    }
}
