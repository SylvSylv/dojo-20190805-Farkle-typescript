/**
 * The classic dice game Farkle.
 */

class Farkle {
    score(roll:number[]):number {
        let score:number = 0

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
            if (score == 0) {
                score = rule(roll)
            }
        }

        return score
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
        return multiple(1, 1000, roll)
    }

    private triple2s(roll:number[]) {
        return multiple(2, 200, roll)
    }

    private triple3s(roll:number[]) {
        return multiple(3, 300, roll)
    }
    private triple4s(roll:number[]) {
        return multiple(4, 400, roll)
    }
    private triple5s(roll:number[]) {
        return multiple(5, 500, roll)
    }
    private triple6s(roll:number[]) {
        return multiple(6, 600, roll)
    }

    private quadruple1s(roll:number[]) {
        if ( roll.length < 4 ) {
            return 0
        }
        return multiple(1, 2000, roll)
    }

    public countDieTypes(roll:number[]) {
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
