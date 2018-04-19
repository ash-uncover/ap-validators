import { STATES } from 'validators/ValidatorBase'
import { ERRORS, checkBool }  from 'validators/ValidatorBool'
import ValidatorBool from 'validators/ValidatorBool'

/* TEST DATA */

let constraints = { ERRORS: ERRORS }

const success = {
    state: STATES.SUCCESS
}
const errorBool = {
    state: STATES.ERROR,
    message: ERRORS.MUST_BE_A_BOOLEAN
}

/* TEST CASES */

describe('ValidatorBool exports', () => {

    beforeEach(() => {
        constraints = { ERRORS: ERRORS }
    })

    describe('checkBool', () => {
        
        test('returns MUST_BE_A_BOOLEAN error for object value', () => {
            expect(checkBool(constraints, {})).toEqual(errorBool)
        })
        test('returns MUST_BE_A_BOOLEAN error for string value', () => {
            expect(checkBool(constraints, '')).toEqual(errorBool)
        })
        test('returns nothing when value is a boolean', () => {
            expect(checkBool(constraints, false)).toEqual()
        })
    })
})

describe('ValidatorBool', () => {

    test('default constructor call', () => {
        expect(new ValidatorBool()).toBeDefined()
    })

    describe('check', () => {
        
        test('returns SUCCESS for a fully valid value', () => {
            const validator = new ValidatorBool()
            expect(validator.check(true)).toEqual(success)
            expect(validator.check(false)).toEqual(success)
        })
        test('returns ERROR for an invalid value', () => {
            const validator = new ValidatorBool()
            
            expect(validator.check('')).toEqual(errorBool)
            expect(validator.check(0)).toEqual(errorBool)
        })
    })
})