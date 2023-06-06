class Turn {
    constructor() {
        this.turns = [];
        this.pinsLeft = 10;
    }

    howManyPinsLeft(pins) {
        return this.pinsLeft = this.pinsLeft - pins; 
    }

    throw() {
        let shoot1 = Math.floor(Math.random()*11);
        this.turns.push(shoot1);
        if(shoot1 === 10) {
            this.pinsLeft = 0;
            return this.turns;
        }
        let leftPins = this.howManyPinsLeft(shoot1);
        let shoot2 = Math.floor(Math.random()*leftPins);
        this.turns.push(shoot2);
        return this.turns;
    }

    isSpare() {  
        return this.turns[0] + this.turns[1] === 10;       
    }

    isStrike() {
        return this.turns[0] === 10;
    }

    puntuation() {
        return this.turns.reduce((total, tiro) => total + tiro, 0);
    };

}

class Game extends Turn {
    constructor() {
        super();
        this.rounds = [];
        this.totalScore = 0;
    }
    
    play() {
        for(let i = 1; i <= 10; i++) {
            let round = new Turn();
            round.throw();
            this.rounds.push(round);
        }
        return this.rounds;
    }

    puntuationFinal() {

        this.play();

        for(let i = 1; i <= 10; i++) {
            this.totalScore += this.rounds[i-1].puntuation();
            
            if(this.rounds[i-1].isStrike()) {
                console.log('Strike');
                this.totalScore += this.rounds[i].puntuation();
                if(this.rounds[i].isStrike()) {
                    this.totalScore += this.rounds[i+1].puntuation();
                }
            } else if (this.rounds[i-1].isSpare()) {
                console.log('Spare');
            }
        }
        return this.totalScore;
    }

}

let game = new Game();

console.log(game.puntuationFinal());


