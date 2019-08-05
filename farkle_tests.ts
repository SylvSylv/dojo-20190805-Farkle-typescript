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
    it('should return 1000 for a 1, 1, 1', () => {
        expect(farkle.score([1, 1, 1])).to.equal(1000)
    }) 
    it('should return 200 for a 2, 2, 2', () => {
        expect(farkle.score([2, 2, 2])).to.equal(200)
    })
    it('should return 2000 for a 1, 1, 1, 1', () => {
        expect(farkle.score([1, 1, 1, 1])).to.equal(2000)
    }) 
})