import {player} from "./Player";
/*     versionplayer:string;
    selectPlayerDisplay:void;
    index:any;
    game:string[]=[];
    player1:string;
    player2:string;
 */
    window.onload = function() {
        preloadImg();
    }

    //let StartPlay:HTMLElement = document.getElementById('start') as HTMLElement;
    let SelectSolo: HTMLElement= document.getElementById('solo') as HTMLElement;
    let SelectMulti:HTMLElement=document.getElementById('multiplayers') as HTMLElement;
    let Go:HTMLFormElement=document.getElementById('Goplay') as HTMLFormElement;
    let home:HTMLFormElement=document.getElementById('backToHomePage') as HTMLFormElement;
    let Rules:HTMLElement=document.getElementById('rules') as HTMLElement;
    //StartPlay.addEventListener("click",()=>StartPlayer);
    SelectSolo.addEventListener("click",()=>SelectNumberPlayer);
    SelectMulti.addEventListener("click",()=>SelectNumberPlayer);
    Go.addEventListener("click",goplay);
    home.addEventListener("click",BackHome);
    Rules.addEventListener("click",displayRule);

    function preloadImg(): void {
        for( let i = 1; i <= 9; i++ ) {
            let img = new Image();
            img.src = `./Pictures/marble${i}.png`;
        }
    }
    function preloadImages(array) {
        if (!preloadImages.list) {
            preloadImages.list = [];
        }
        var list = preloadImages.list;
        for (var i = 0; i < array.length; i++) {
            var img = new Image();
            img.onload = function() {
                var index = list.indexOf(this);
                if (index !== -1) {
                    // remove image from the array once it's loaded
                    // for memory consumption reasons
                    list.splice(index, 1);
                }
            }
            list.push(img);
            img.src = array[i];
        }
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
        let player1: HTMLInputElement;
        let player2: HTMLInputElement;
        let versionplayer: string;
        versionplayer=localStorage.getItem('Type');
        console.log(localStorage.getItem('Type'));
        if(versionplayer==="solo")
        {
            player1=document.getElementById('username1') as HTMLInputElement;
            localStorage.setItem('name1',player1.value);
            //gameVsIA();
        }
        else{
            player1=document.getElementById('username1').value as HTMLFormElement;
            player2=document.getElementById('username2').value as HTMLFormElement;
            localStorage.setItem('name1',player1);
            localStorage.setItem('name2',player2);
            gameMultiplayers()
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
}
