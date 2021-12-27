import { doc } from "firebase/firestore";
import {player} from "./Player";

    let StartPlay:HTMLButtonElement = document.getElementById('start') as HTMLButtonElement;
    let SelectSolo: HTMLButtonElement= document.getElementById('solo') as HTMLButtonElement;
    let SelectMulti:HTMLButtonElement=document.getElementById('multiplayers') as HTMLButtonElement;
    let Go:HTMLFormElement=document.getElementById('Goplay') as HTMLButtonElement;
    let home:HTMLButtonElement=document.getElementById('backToHomePage') as HTMLButtonElement;
    let Rules:HTMLButtonElement=document.getElementById('rules') as HTMLButtonElement;
    const DialogModal:any=document.getElementById('modalRules');
    let texte:string;
    let ruleClose=document.getElementById('closeRules');
    let RulesM:HTMLElement=document.getElementsByClassName('RulesM');
//Section for the addEventListener    

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
        let selectPlayerDisplay:HTMLButtonElement;
        index=document.getElementById('homePage') as HTMLElement;
        index.setAttribute('class',"hidden");
        selectPlayerDisplay=document.getElementById('selectPlayers') as HTMLElement;
        selectPlayerDisplay.removeAttribute('class');
    }

//function select type of game
    function SelectNumberPlayer(e:string){
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
        let player1: string;
        let player2: string;
        let versionplayer: string;
        versionplayer=localStorage.getItem('Type');
        console.log(versionplayer);
        console.log(localStorage.getItem('Type'));
        if(versionplayer==="solo")
        {
            player1=document.getElementById('username1').value as string;
            localStorage.setItem('name1',player1);
            // player.gameVsIA();
        }
        else{
            player1=document.getElementById('username1').value as string;
            player2=document.getElementById('username2').value as string;
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
        resetLocalStorage();
        HomePage=document.getElementById('homePage') as HTMLElement;
        HomePage.removeAttributeNS('class','hidden');
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
    function resetLocalStorage(){
        localStorage.clear("http://127.0.0.1:5000");
    }
//function Display rule
    function displayRule(){
        /* let RulesM=document.getElementById('RulesM') as HTMLElement; */
        RulesM.classList.toggle('hidden');
        let DialogModal:HTMLElement=document.getElementById('modalRules')as HTMLElement;
        DialogModal.classList.toggle('hidden');
        DialogModal.setAttribute('aria-hidden',true);
        
    }
// event listener for when click outside the modal this close it 
    document.getElementById('RulesM').addEventListener("click", function(e){
            if (!e.target.closest("#modalRules")){
                 closeRules(); 
            }
    })
//close the modal windows 
    function closeRules(){
        let DialogModal:HTMLElement=document.getElementById('modalRules');
        DialogModal.removeAttribute('aria-modal');
        DialogModal.removeAttribute('role');
        DialogModal.setAttribute('aria-hidden',false);
        DialogModal.setAttribute('class','hidden');
        /* let RulesM=document.getElementById('RulesM')as HTMLElement; */
        /* RulesM.classList.toggle('hidden'); */
        RulesM.setAttribute('class','hidden');
    }
}
