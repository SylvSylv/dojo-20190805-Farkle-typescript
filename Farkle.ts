/**
 * The classic dice game Farkle.
 */

class Farkle {
    private score: number


    constructor() {
        this.score = 0
    }

    getScoreForRoll(roll:number[]):number {
        // we must treat the most dice first
        const rules = [
            this.quadruple1s,
            this.triple1s,
            this.triple2s,
            this.triple3s,
            this.triple4s,
            this.triple5s,
            this.triple6s,
            this.single1,
            this.single5
        ]
        for (const rule of rules){
            if (this.score == 0) {
                this.score = rule.call(this, roll)
            }
        }

        return this.score
    }

    private single1(roll:number[]) {
        if (roll[0] == 1) {
            return 100;
        }
        return 0;
    }

    private single5(roll:number[]) {
        if (roll[0] == 5) {
            return 50;
        }
        return 0;
    }

    private triple1s(roll:number[]) {
        return this.getScoreForGivenTriplet(1, 1000, roll)
    }

    private getScoreForGivenTriplet(tripletOfType: number, scoreForTriplet: number, roll: number[]) {
        const rollObj = this.countDieTypesOf(roll)
        if (rollObj["die"+tripletOfType] === 3) {
            return scoreForTriplet
        }
        return 0
    }

    private triple2s(roll:number[]) {
        return this.getScoreForGivenTriplet(2, 200, roll)
    }

    private triple3s(roll:number[]) {
        return this.getScoreForGivenTriplet(3, 300, roll)
    }
    private triple4s(roll:number[]) {
        return this.getScoreForGivenTriplet(4, 400, roll)
    }
    private triple5s(roll:number[]) {
        return this.getScoreForGivenTriplet(5, 500, roll)
    }
    private triple6s(roll:number[]) {
        return this.getScoreForGivenTriplet(6, 600, roll)
    }

    private quadruple1s(roll:number[]) {
        if ( roll.length < 4 ) {
            return 0
        }
        return multiple(1, 2000, roll)
    }

    public countDieTypesOf(roll:number[]) {
        const dieTypesObj = {
            // die1: 0,
            // die2: 0,
            // die3: 0,
            // die4: 0,
            // die5: 0,
            // die6: 0,
        }

        for (let dieValue of roll) {
            dieTypesObj["die"+dieValue] = dieTypesObj["die"+dieValue] || 0
            dieTypesObj["die"+dieValue] ++
        }
        return dieTypesObj
    }
}

/**
 * Matches the dice of a roll against a value.
 * If every die of the roll is of the given value, returns the score.
 * Otherwise returns 0.
 * TODO : handle multiple dice of the same value, but with extra dice with other values.
 */
function multiple(verifiedValue:number, score:number, roll:number[]) {
    if ( roll.length < 3 ) {
        return 0
    }

    const diceAllEqualVerifiedValue = roll.reduce( (acc, die) => {
        return acc && (die === verifiedValue)
    }, true)

    if (diceAllEqualVerifiedValue) {
        return score;
    }

    return 0
}

export { Farkle }
