


/*     versionplayer:string;
    selectPlayerDisplay:void;
    index:any;
    game:string[]=[];
    player1:string;
    player2:string;
 */
    
    function StartPlayer(){
        let index:HTMLElement;
        index=document.getElementById('homePage') as HTMLElement;
        index.style.display="none";
        let selectPlayerDisplay:void;
        selectPlayerDisplay=document.getElementById('selectPlayers');
        selectPlayerDisplay.removeAttribute('class','hidden');
        console.log("test start");
    }
    
    function SelectNumberPlayer(chooseP){
        let versionplayer: string;
        versionplayer=chooseP;
        let displayname:HTMLFormElement;
        localStorage.setItem('Type',versionplayer);
        if(versionplayer==="solo"){
            displayname=document.getElementById('username1')as HTMLFormElement;
            displayname.removeAttribute('class','hidden');
            document.getElementById('Name1').removeAttribute('class') as HTMLElement ;
            return versionplayer;
        }
        else {
            displayname=document.getElementById('username1')as HTMLFormElement;
            displayname.removeAttribute('class','hidden');
            document.getElementById('Name1').removeAttribute('class') as HTMLElement ;
            displayname=document.getElementById('username2');
            displayname.removeAttribute('class','hidden');
            document.getElementById('Name2').removeAttribute('class') as HTMLElement ;
            return versionplayer;
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

