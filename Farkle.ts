class Farkle {
    score(roll:number[]):number {
        let result:number = 0
        // we must treat the most dice first
        const rules = [this.quadruple1s, this.triple1s, this.triple2s, this.single1, this.single5]
        for (const rule of rules){
            if (result == 0) {
                result = rule(roll)
            }
        }


        return result
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

    private quadruple1s(roll:number[]) {
        if ( roll.length < 4 ) {
            return 0
        }
        return multiple(1, 2000, roll)
    }
}
    
function multiple(value:number, score:number, roll:number[]) {
    if ( roll.length < 3 ) {
        return 0
    }
    const diceAllEqualVerifiedValue = roll.reduce( (acc, die) => {
        return acc && (die === value)
    }, true)
    if (diceAllEqualVerifiedValue) {
        return score;
    }
    return 0
}

export { Farkle }