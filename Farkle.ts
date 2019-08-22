/**
 * The classic dice game Farkle.
 */

class Farkle {
    private score: number


    private readonly dieValues = [1, 2, 3, 4, 5, 6];

    constructor() {
        this.score = 0
    }

    getScoreForRoll(roll:number[]):number {
        // we must treat the most dice first
        const rules = [
            this.quaterns,
            this.triplets,
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

    private checkForTripletAndGetScore(tripletOfType: number, roll: number[]) {
        const rollObj = this.countDieTypesOf(roll)
        if (rollObj["die"+tripletOfType] === 3) {
            return this.getScoreForTriplet(tripletOfType)
        }
        return 0
    }

    private checkForQuaternAndGetScore(quaternOfType: number, roll: number[]) {
        const rollObj = this.countDieTypesOf(roll)
        if (rollObj["die"+quaternOfType] === 4) {
            return this.getScoreForQuatern(quaternOfType)
        }
        return 0
    }

    private triplets(roll: number[]) {
        let localScore = 0
        for (let dieValue of this.dieValues) {
            localScore += this.checkForTripletAndGetScore(dieValue, roll)    
        }
        return localScore
    }

    private quaterns(roll: number[]) {
        let localScore = 0
        for (let dieValue of this.dieValues) {
            localScore += this.checkForQuaternAndGetScore(dieValue, roll)    
        }
        return localScore
    }

    private getScoreForTriplet(typeOfTriplet: number) {
        return typeOfTriplet != 1 ? typeOfTriplet*100 : 1000
    }

    private getScoreForQuatern(typeOfQuatern) {
        return this.getScoreForTriplet(typeOfQuatern)*2
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
