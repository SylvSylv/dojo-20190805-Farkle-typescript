import { Farkle } from './Farkle'

import * as mocha from 'mocha'
import * as chai from 'chai'
const expect = chai.expect

let farkle:Farkle;
beforeEach(() => {
    farkle = new Farkle();   // #1
})

describe('Farkle score', () => {
    it('should return 100 for a 1', () => {
        expect(farkle.score([1])).to.equal(100)
    })
    it('should return 50 for a 5', () => {
        expect(farkle.score([5])).to.equal(50)
    }) 
    it('should return 1000 for a 1,1,1', () => {
        expect(farkle.score([1,1,1])).to.equal(1000)
    }) 
    it('should return 200 for a 2,2,2', () => {
        expect(farkle.score([2,2,2])).to.equal(200)
    })


    it('should return 300 for a 3,3,3', () => {
        expect(farkle.score([3,3,3])).to.equal(300)
    })
    it('should return 400 for a 4,4,4', () => {
        expect(farkle.score([4,4,4])).to.equal(400)
    })
    it('should return 500 for a 5,5,5', () => {
        expect(farkle.score([5,5,5])).to.equal(500)
    })
    it('should return 600 for a 6,6,6', () => {
        expect(farkle.score([6,6,6])).to.equal(600)
    })

    
    it('should return 400 for a 4,4,4,1', () => {
        expect(farkle.score([4,4,4,1])).to.equal(400)
    })


    it('should return 2000 for a 1,1,1,1', () => {
        expect(farkle.score([1,1,1,1])).to.equal(2000)
    }) 

    it('should count 3 die1 for 1,1,1', () => {
        expect(farkle.countDieTypes([1,1,1])).to.equal({
            die1: 3
        })
    })
})