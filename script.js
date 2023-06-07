class Turn {
    constructor() {
        this.turns = [];
    }

    howManyPinsLeft(pins) {
        let pinsLeft = 11;
        return pinsLeft - pins;
    }

    throw() {
        let shoot1 = this.random(11)
        this.turns.push(shoot1);
        if (shoot1 === 10) {
            return this.turns;
        }
        let leftPins = this.howManyPinsLeft(shoot1);
        let shoot2 = this.random(leftPins);
        this.turns.push(shoot2);
        return this.turns;
    }

    oneThrow() {
        let shoot = this.random(11)
        this.turns.push(shoot);
        return shoot;
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

    random(pins) {
        return Math.floor(Math.random() * pins);
    }

}

class Game extends Turn {
    constructor() {
        super();
        this.rounds = [];
        this.totalScore = 0;
    }

    play() {
        for (let i = 1; i <= 10; i++) {
            let round = new Turn();
            round.throw();
            this.rounds.push(round);
        }
        return this.rounds;
    }

    extraPlay() {
        let round = new Turn();
        this.totalScore += round.oneThrow();
        this.rounds.push(round);
    }

    puntuationFinal() {

        this.play();

        console.table(this.rounds);
        for (let i = 0; i < 9; i++) {
            this.totalScore += this.rounds[i].puntuation();
            console.log(this.totalScore)

            if (this.rounds[i].isStrike()) {
                console.log('Strike');
                this.totalScore += this.rounds[i + 1].puntuation();
                console.log('=> ', this.totalScore)
                if (this.rounds[i + 1].isStrike()) {
                    this.totalScore += this.rounds[i + 2].puntuation();
                }
            } else if (this.rounds[i].isSpare()) {
                this.totalScore += this.rounds[i + 1].turns[0]
            }
        }
        if (this.rounds[9].isSpare()) {
            console.log('Spare en el ultimo tiro')
        }
        if (this.rounds[9].isSpare() || this.rounds[9].isStrike()) {
            this.extraPlay();
        }

        console.table(this.rounds)
        return this.totalScore;
    }

}

let game = new Game();

console.log(`La puntuación final es: ${game.puntuationFinal()}`);


