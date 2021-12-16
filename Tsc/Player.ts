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

    getNumber(): string {
        return "001";
    };

    bet(marbles: number): void {
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
// let p1 = new player("hervé", 1);
// let p2 = new player("jc", 456);
// console.log(p1.getNumber());
// p1.bet(3);
// if (p2.guess(true, p1)) {
//     console.log("p2 a bien deviné un nombre pair et gagne" + p1.marbles);
// };s