import {player} from "./Player";
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
    StartPlay.addEventListener("click",StartPlayer);
    SelectSolo.addEventListener("click",()=>SelectNumberPlayer);
    SelectMulti.addEventListener("click",()=>SelectNumberPlayer);
    Go.addEventListener("click",goplay);
    home.addEventListener("click",BackHome);
    Rules.addEventListener("click",displayRule);

    

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
    
    function SelectNumberPlayer(e:string){
        if (localStorage.type!=null){
        localStorage.removeItem('Type');
        let versionplayer: string;
        versionplayer=e.target.value;
        let displayname:HTMLFormElement;
        let Name2:HTMLFormElement;
        Name2=document.getElementById('Name2') as HTMLFormElement;
        localStorage.setItem('Type',versionplayer);
        if(versionplayer==="solo"){
            displayname=document.getElementById('username1')as HTMLFormElement;
            displayname.removeAttribute('class');
            document.getElementById('Name1').removeAttribute('class');
            if(Name2.getAttribute('class')==null){
                Name2.setAttribute('class',"hidden"); 
            }
            return versionplayer;
        }
        else {
            displayname=document.getElementById('username1')as HTMLFormElement;
            displayname.removeAttribute('class','hidden');
            document.getElementById('Name1').removeAttribute('class') as HTMLElement ;
            displayname=document.getElementById('username2');
            displayname.removeAttribute('class');
            document.getElementById('Name2').removeAttribute('class') as HTMLElement ;
            return versionplayer;
            } 
        }
        else {
            let versionplayer: string;
            versionplayer=e.target.value;
            let displayname:HTMLFormElement;
            let Name2:HTMLFormElement;
            Name2=document.getElementById('Name2') as HTMLFormElement;
            localStorage.setItem('Type',versionplayer);
            if(versionplayer==="solo"){
                displayname=document.getElementById('username1')as HTMLFormElement;
                displayname.removeAttribute('class');
                document.getElementById('Name1').removeAttribute('class');
                if(Name2.getAttribute('class')==null){
                    Name2.setAttribute('class',"hidden"); 
                }
                return versionplayer;
            }
            else {
                displayname=document.getElementById('username1')as HTMLFormElement;
                displayname.removeAttribute('class');
                document.getElementById('Name1').removeAttribute('class');
                displayname=document.getElementById('username2');
                displayname.removeAttribute('class');
                document.getElementById('Name2').removeAttribute('class');
                return versionplayer;
                } 
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
        }
        else{
            player1=document.getElementById('username1').value as HTMLFormElement;
            player2=document.getElementById('username2').value as HTMLFormElement;
            localStorage.setItem('name1',player1);
            localStorage.setItem('name2',player2);
        }
    }

    function BackHome(){
        let HomePage:HTMLElement;
        let selectPlayers:HTMLElement;
        let gameChoose:HTMLElement;
        let gameGuess:HTMLElement;
        let chaningPlayer:HTMLElement;
        HomePage=document.getElementById('homePage') as HTMLElement;
        HomePage.removeAttribute('class');
        HomePage.setAttribute('class','home');
        selectPlayers=document.getElementById('selectPlayers') as HTMLElement;
        gameChoose=document.getElementById('gameChoice') as HTMLElement;
        gameGuess=document.getElementById('gameGuess') as HTMLElement;
        chaningPlayer=document.getElementById('changingPlayer') as HTMLElement;
        if(selectPlayers.getAttribute('class')==null){
            selectPlayers.setAttribute('class',"hidden");
        }
        if(gameChoose.getAttribute('class')==null){
            gameChoose.setAttribute('class','hidden');
        }
        if(gameGuess.getAttribute('class')==null){
            gameGuess.setAttribute('class','hidden');
        }
        if(chaningPlayer.getAttribute('class')==null){
            chaningPlayer.setAttribute('class','hidden');
        }
    }

    function displayRule(){
        let DialogModal:any=document.getElementById('DialogModal').showModal()
        console.log('test');

    }
<<<<<<< HEAD
}
=======

>>>>>>> 0e1f2ab570267f59a2a7da8446485e41dbe8651c
