/**
 * Classe représentant un joueur.
 */
export class player {
    marbles: number;
    name: string;
    colorMarbles: Array<number> = [];
    private matricule: number;
    private marblesBet: number;
    

    /**
     * Constructeur de la classe. Le joueur reçoit 10 billes.
     * @param playerName le nom du joueur.
     * @param matricule le matricule qui lui sera attribué.
     */
    constructor(playerName: string, matricule: number) {
        this.marbles = 10;
        this.name = playerName;
        this.matricule = matricule;
        this.marblesBet = 0;
        this.initColors();
    }

    /**
     * Attribue un numéro de couleur de bille aléatoire entre 1 et 9
     */
    private initColors(): void {
        for( let i = 0; i < 20; i++) {
            this.colorMarbles.push( Math.floor(Math.random()*9) + 1 );
        }
    }

    /**
     * 
     * @returns le matricule du joueur formatté sur 3 chiffres
     */
    getMatricule(): string {
        let m = this.matricule.toString();
        return ("000" + m).slice(-3);
    };

    /**
     * Le joueur mise une ou plusieurs billes.
     * @param marbles le nombre de billes misées
     */
    bet(marbles: number): void {

        console.log(this.name + " bet " + marbles);
        if( marbles > this.marbles ) {

            throw new Error(`Le nombre de billes pariées (${marbles}) est supérieur au nombre de billes restantes (${this.marbles}).`);
        }
        if( marbles <= 0 ) {
            throw new Error("Le nombre de billes misées doit être supérieur à 0 !")
        }
        this.marblesBet = marbles;
    }

    /**
     * Le joueur doit deviner si la mise du player2 est paire ou impaire
     * Le nombre de billes de chaque joueur est mis à jour en conséquence
     * @param choice le choix entre pair ou impair
     * @param player2 le joueur dont on doit deviner la mise (marblesBet)
     * @returns vrai si bien deviné (gain), faux sinon (perte)
     */
    guess(choice : "even" | "odd", player2: player): boolean {
        if( player2.marblesBet == 0 ) {
            throw new Error(`Le player2 (matricule ${player2.getMatricule()}) n'a pas misé de billes !`);
        }
        let victoire: boolean;
        if( choice == "even" ) {
            victoire = ( player2.marblesBet % 2 == 0 );
        } else {
            victoire = (player2.marblesBet % 2 != 0);
        }
        if (victoire) {
            player2.marbles -= player2.marblesBet;
            this.marbles += player2.marblesBet; //le joueur gagne les billes misées
        } else {
            let perte = player2.marblesBet;
            if( perte > this.marbles ) perte = this.marbles;
            player2.marbles += perte;
            this.marbles -= perte; //le joueur perd les billes misées
        }
        player2.marblesBet = 0;
        return victoire;
    }

    /**
     * 
     * @returns true si le player n'a plus de billes, false sinon.
     */
    isDead(): boolean {
        return (this.marbles <= 0);
    }

    
}


//Exemples d'utilisation
// let p1 = new player("hervé", 1);
// let p2 = new player("jc", 456);
// console.log(p1.getMatricule());
// p2.bet(4);
// if(p1.guess("impair", p2)) {
//     console.log("gagné");
// } else {
//     console.log("perdu");
// }
// console.log(p1);
// console.log(p2);
// p1.bet(3);
// if (p2.guess("impair", p1)) {
//     console.log("p2 a bien deviné un nombre pair et gagne.");
// };
