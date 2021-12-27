//import { doc } from "firebase/firestore";
import {resetAll} from "./Game";

//let StartPlay = document.getElementById('start') as HTMLButtonElement;
const SelectSolo = document.getElementById('solo') as HTMLButtonElement;
const SelectMulti = document.getElementById('multiplayers') as HTMLButtonElement;
//let Go = document.getElementById('goPlay') as HTMLButtonElement;
const home = document.getElementById('backToHomePage') as HTMLButtonElement;
const Rules = document.getElementById('rules') as HTMLButtonElement;
const DialogModal = document.getElementById('modalRules') as HTMLDivElement;
const ruleClose = document.getElementById('closeRules') as HTMLButtonElement;
const RulesM = document.getElementById('RulesM') as HTMLDivElement;
const name1 = document.getElementById('Name1') as HTMLDivElement;
const name2 = document.getElementById('Name2') as HTMLDivElement;
//Section for the addEventListener    

//StartPlay.addEventListener("click",StartPlayer);
SelectSolo.addEventListener("click", () => SelectNumberPlayer(1) );
SelectMulti.addEventListener("click", () => SelectNumberPlayer(2) );
//Go.addEventListener("click",goplay);
home.addEventListener("click",BackHome);
Rules.addEventListener("click",displayRule);
ruleClose.addEventListener("click",closeRules);
    
/**
 * Affiche les zones de saisie des noms pour un ou deux joueurs
 * @param n 1 ou 2 joueurs
 */
function SelectNumberPlayer(n: 1 | 2 ): void {
    switch( n ) {
        case 1:
            //un joueur versus IA
            name1.classList.remove('hidden');
            name2.classList.add('hidden');
            localStorage.setItem("Type","solo");
            break;
        case 2 :
            //deux joueurs
            name1.classList.remove('hidden');
            name2.classList.remove('hidden');
            localStorage.setItem("Type", "multi");
            break;
    }
}

/**
 * Retour en page d'acceuil. Annule la partie en cours.
 */
function BackHome(): void {
    resetAll();
    name1.classList.add('hidden');
    name2.classList.add('hidden');
    localStorage.clear();
}

//function Display rule
function displayRule(){
    RulesM.classList.remove('hidden');
    DialogModal.classList.remove('hidden');
    DialogModal.setAttribute('aria-hidden','true');
}
// event listener for when click outside the modal this close it 
   /* document.getElementById('RulesM')!.addEventListener("click", () => { function(e){
            if (!e.target.closest("#modalRules")){
                 closeRules(); 
            }
        }
    }) */
//close the modal windows 
function closeRules(){
    let DialogModal = document.getElementById('modalRules') as HTMLElement;
    DialogModal.removeAttribute('aria-modal');
    DialogModal.removeAttribute('role');
    DialogModal.setAttribute('aria-hidden','false');
    DialogModal.setAttribute('class','hidden');
    /* let RulesM=document.getElementById('RulesM')as HTMLElement; */
    /* RulesM.classList.toggle('hidden'); */
    let RulesM = document.getElementById('RulesM') as HTMLElement;
    RulesM.classList.add('hidden');
}

