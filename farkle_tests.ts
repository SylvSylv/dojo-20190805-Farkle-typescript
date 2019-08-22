import { Farkle } from './Farkle'

import * as mocha from 'mocha'
import * as chai from 'chai'
const expect = chai.expect

let farkle:Farkle;

beforeEach(() => {
    farkle = new Farkle();   // #1
})

describe('Basic score', () => {
    it('should return 100 for a 1', () => {
        expect(farkle.getScoreForRoll([1])).to.equal(100)
    })
    it('should return 50 for a 5', () => {
        expect(farkle.getScoreForRoll([5])).to.equal(50)
    })
})

describe("Using a roll object", () => {
    it("CountDieTypes: should count 3 die1's for 1,1,1", () => {
        const result: any = farkle.countDieTypesOf([1,1,1]);
        expect(result).to.deep.equal({die1: 3});
    })

    it("CountDieTypes: should count 2 die2's for 2,2", () => {
        const result: any = farkle.countDieTypesOf([2,2]);
        expect(result).to.deep.equal({die2: 2});
    })

    it("CountDieTypes: should count accordingly for 1,2,3,4,5,5,6,6 and return a valid roll object", () => {
        const result: any = farkle.countDieTypesOf([1,2,3,4,5,5,6,6]);
        expect(result).to.deep.equal({
            die1: 1,
            die2: 1,
            die3: 1,
            die4: 1,
            die5: 2,
            die6: 2,
        });
    })
})

describe("Roll with triplet", () => {
    it('should return 1000 for a 1,1,1', () => {
        expect(farkle.getScoreForRoll([1,1,1])).to.equal(1000)
    }) 
    it('should return 200 for a 2,2,2', () => {
        expect(farkle.getScoreForRoll([2,2,2])).to.equal(200)
    })
    it('should return 300 for a 3,3,3', () => {
        expect(farkle.getScoreForRoll([3,3,3])).to.equal(300)
    })
    it('should return 400 for a 4,4,4', () => {
        expect(farkle.getScoreForRoll([4,4,4])).to.equal(400)
    })
    it('should return 500 for a 5,5,5', () => {
        expect(farkle.getScoreForRoll([5,5,5])).to.equal(500)
    })
    it('should return 600 for a 6,6,6', () => {
        expect(farkle.getScoreForRoll([6,6,6])).to.equal(600)
    })

    it('should handle extra die and return 400 for a 4,4,4,1', () => {
        expect(farkle.getScoreForRoll([4,4,4,1])).to.equal(400)
    })
})

describe("Roll with quatern", () => {
    it('should return 2000 for a 1,1,1,1', () => {
        expect(farkle.getScoreForRoll([1,1,1,1])).to.equal(2000)
    })

})


