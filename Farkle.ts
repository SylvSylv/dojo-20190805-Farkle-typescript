type dieValue = 1|2|3|4|5|6
type dieRoll = dieValue[]

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
            this.fives,
            this.quaterns,
            this.triplets,
            this.single1,
            this.single5
        ]
        for (const rule of rules){
            this.score += rule.call(this, roll)
        }
        return this.score
    }

    private single1(roll:number[]): number {
        const rollObj = this.countDieTypesOf(roll)
        const { die1 } = rollObj
        return (die1 && die1 < 3) ? die1 * 100 : 0
    }

    private single5(roll:number[]) {
        const rollObj = this.countDieTypesOf(roll)
        const { die5 } = rollObj
        return (die5 && die5 < 3) ? die5 * 50 : 0
    }

    private _handlingMultiple(multipleOfAKind: number, targetMultiple: dieValue, roll: dieRoll) {
        const rollObj = this.countDieTypesOf(roll)
        if (rollObj["die"+multipleOfAKind] === targetMultiple) {
            return this.getScoreForMultiple(targetMultiple, multipleOfAKind)
        }
        return 0
    }

    private checkRollByFunctionAndGetScore(roll, getScoreIfCombination: Function) {
        // if for each die type, we check if there is a combinaison, and we return the score
        let localScore = 0
        for (let dieValue of this.dieValues) {
            localScore += getScoreIfCombination.call(this, dieValue, roll)    
        }
        return localScore
    }

    getCheckFunctionForCombinaisonSize(combinaisonSize: dieValue): Function {
        return function checkForCombinaisonAndGetScore(combinaisonType: number, roll: dieRoll) {
            return this._handlingMultiple(combinaisonType, combinaisonSize, roll)
        }
    }

    private triplets(roll: dieRoll) {
        return this.checkRollByFunctionAndGetScore(roll, this.getCheckFunctionForCombinaisonSize(3))
    }

    private quaterns(roll: dieRoll) {
        return this.checkRollByFunctionAndGetScore(roll, this.getCheckFunctionForCombinaisonSize(4))
    }

    private fives(roll: dieRoll) {
        return this.checkRollByFunctionAndGetScore(roll, this.getCheckFunctionForCombinaisonSize(5))
    }

    getScoreForMultiple(targetMultiple: number, multipleOfAKind: number) {
        switch (targetMultiple) {
            case 3: // triplets
                return multipleOfAKind != 1 ? multipleOfAKind*100 : 1000
            case 4:
                return this.getScoreForMultiple(3, multipleOfAKind)*2
            case 5:
                return this.getScoreForMultiple(3, multipleOfAKind)*3
        }
    }

    public countDieTypesOf(roll:number[]): any {
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

export { Farkle }
