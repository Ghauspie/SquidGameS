class player {
    marbles: number;
    name: string;
    private matricule: number;
    private marblesBet: number;

    constructor(playerName: string, matricule: number) {
        this.marbles = 10; //Chaque joueur a 10 billes au départ
        this.name = playerName;
        this.matricule = matricule;
        this.marblesBet = 0;
    }

    //Renvoie le matricule du joueur formatté sur 3 chiffres
    getMatricule(): string {
        let m = this.matricule.toString();
        return ("000" + m).slice(-3);
    };

    bet(marbles: number): void {
        if( marbles > this.marbles ) {
            throw new Error(`Le nombre de billes pariées (${marbles}) est supérieur au nombre de billes restantes (${this.marbles}).`);
        }
        this.marblesBet = marbles;
    }

    guess(pair: boolean, player2: player): boolean {
        this.marbles += player2.marblesBet;
        return true;
    }

    isDead() : boolean {
        return (this.marbles <= 0);
    }

}

//Exemples d'utilisation
let p1 = new player("hervé", 1);
let p2 = new player("jc", 456);
console.log(p1.getMatricule());
// p1.bet(3);
// if (p2.guess(true, p1)) {
//     console.log("p2 a bien deviné un nombre pair et gagne.");
// };