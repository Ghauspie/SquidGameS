/**
 * Classe représentant un joueur.
 */

export class player {
    marbles: number;
    name: string;
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
        if (marbles > this.marbles) {
            throw new Error(`Le nombre de billes pariées (${marbles}) est supérieur au nombre de billes restantes (${this.marbles}).`);
        }
        if (marbles <= 0) {
            throw new Error("Le nombre de billes misées doit être supérieur ou égal à 0 !")
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
    guess(choice: "pair" | "impair", player2: player): boolean {
        if (player2.marblesBet == 0) {
            throw new Error(`Le player2 (matricule ${player2.getMatricule()}) n'a pas misé de billes !`);
        }
        let victoire: boolean;
        if (choice == "pair") {
            victoire = (player2.marblesBet % 2 == 0);
        } else {
            victoire = (player2.marblesBet % 2 != 0);
        }
        if (victoire) {
            player2.marbles -= player2.marblesBet;
            this.marbles += player2.marblesBet; //le joueur gagne les billes misées
        } else {
            player2.marbles += player2.marblesBet;
            this.marbles -= player2.marblesBet; //le joueur perd les billes misées
        }
        player2.marblesBet = 0; //pas forcément indispensable
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
// if (p2.guess(true, p1)) {
//     console.log("p2 a bien deviné un nombre pair et gagne.");
// };
