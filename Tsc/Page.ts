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
    let DialogModal:any=document.getElementById('modalRules');
    let texte:string;
    let ruleClose=document.getElementById('closeRules');
    
    document.addEventListener("click", function (e) {
         console.log(DialogModal.id, e.target.className);
        if((e.target.className)!=(DialogModal.id="modalRules")){
            
            closeRules;
        }else {
            closeRules;
        }
      },false);  

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
            player.gameVsIA();
        }
        else{
            player1=document.getElementById('username1').value as HTMLFormElement;
            player2=document.getElementById('username2').value as HTMLFormElement;
            localStorage.setItem('name1',player1);
            localStorage.setItem('name2',player2);
            player.gameMultiplayers();
        }
    }
//Function return home and reset
    function BackHome(){
        let HomePage:HTMLElement;
        let selectPlayers:HTMLElement;
        let gameChoose:HTMLElement;
        let gameGuess:HTMLElement;
        let chaningPlayer:HTMLElement;
        let gameOver:HTMLElement;
        HomePage=document.getElementById('homePage') as HTMLElement;
        HomePage.removeAttributeNS('class','hidden');
        HomePage.removeAttribute('class');
        HomePage.setAttribute('class','home'); 
        selectPlayers=document.getElementById('selectPlayers') as HTMLElement;
        gameChoose=document.getElementById('gameChoice') as HTMLElement;
        gameGuess=document.getElementById('gameGuess') as HTMLElement;
        chaningPlayer=document.getElementById('changingPlayer') as HTMLElement;
        gameOver=document.getElementById('gameOver') as HTMLElement;
        gameOver.setAttribute('class','hidden');
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
        resetLocalStorage;

    }
    function resetLocalStorage{
        localStorage.removeItem('Type');
        localStorage.removeItem('name1');
        localStorage.removeItem('playerTurn');
        sessionStorage.removeItem('IsThisFirstTime_Log_From_LiveServer');        
    }
//function Display rule
    function displayRule(){
        DialogModal=document.getElementById('modalRules');
        if(DialogModal.getAttribute('class')!=null){
            DialogModal.removeAttribute('class','hidden');
            DialogModal.removeAttribute('aria-hidden');
            DialogModal.setAttribute('aria-modal',true);
            DialogModal.setAttribute('role','dialog');
            document.getElementById('modal-Content').innerHTML= "Le jeux des billes ce joue par deux ou seulement avec le boot.\\n Chacun des joueurs obtienne un sac qui contient 10 billes. \n A chaque tours le joueur qui doit deviner mets dans sa main un nombre de billes qui souhaite miser, allant de 1 a 10. Puis il indique si il choisit le nombre pair ou impair. \n Pendant le même temps le second joueur decide combien de billes il met dans sa main. \n Une fois les 2 joueurs prets le joueur qui doit devine indique son choix de pair ou impair. Si il a bien devine, alors il emporte le nombre de bille qu'il avait mise. Puis on inverse les roles. Sinon il donne les billes qu'il avait misé.\n Une fois la partie terminé c'est la fin pour le joueur. Et vous ne reverrez plus jamais la lumiere.";
        }
        else {
            DialogModal.removeAttribute('aria-modal');
            DialogModal.removeAttribute('role');
            DialogModal.setAttribute('aria-hidden',true);
            DialogModal.setAttribute('class','hidden');
        }
    }


    function closeRules(){
        let DialogModal:any=document.getElementById('modalRules');
        DialogModal.removeAttribute('aria-modal');
        DialogModal.removeAttribute('role');
        DialogModal.setAttribute('aria-hidden',true);
        DialogModal.setAttribute('class','hidden');
    }
}
