import { STATES } from 'validators/ValidatorBase'
import { ERRORS, checkObject }  from 'validators/ValidatorObject'
import ValidatorObject from 'validators/ValidatorObject'

/* TEST DATA */

let constraints = { ERRORS: ERRORS }

const success = { 
    state: STATES.SUCCESS 
}
const errorObject = {
    state: STATES.ERROR,
    message: ERRORS.MUST_BE_AN_OBJECT
}

/* TEST CASES */

describe('ValidatorObject exports', () => {

    beforeEach(() => {
        constraints = { ERRORS: ERRORS }
    })

    describe('checkObject', () => {
        
        test('returns MUST_BE_AN_OBJECT error for array value', () => {
            expect(checkObject(constraints, [])).toEqual(errorObject)
        })
        test('returns MUST_BE_AN_OBJECT error for string value', () => {
            expect(checkObject(constraints, '')).toEqual(errorObject)
        })
        test('returns nothing when value is an object', () => {
            expect(checkObject(constraints, {})).toEqual()
        })
    })
})

describe('ValidatorObject', () => {

    test('default constructor call', () => {
        expect(new ValidatorObject()).toBeDefined()
    })

    describe('check', () => {
        
        test('returns SUCCESS for a fully valid value', () => {
            const validator = new ValidatorObject()

            expect(validator.check({})).toEqual(success)
        })
        test('returns ERROR for an invalid value', () => {
            const validator = new ValidatorObject()

            expect(validator.check('')).toEqual(errorObject)
            expect(validator.check([])).toEqual(errorObject)
        })
    })
})