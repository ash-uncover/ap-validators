import { STATES } from 'validators/ValidatorBase'
import { ERRORS, checkObject, checkShape }  from 'validators/ValidatorObject'
import ValidatorObject from 'validators/ValidatorObject'
import ValidatorMock from '__mocks__/Validator.mock'

/* TEST DATA */

let constraints = { ERRORS: ERRORS }

const success = { 
    state: STATES.SUCCESS 
}
const errorObject = {
    state: STATES.ERROR,
    message: ERRORS.MUST_BE_AN_OBJECT
}
const errorUnexpected = {
    state: STATES.ERROR,
    message: ERRORS.UNEXPECTED_MEMBERS
}
const errorInvalid = {
    state: STATES.ERROR,
    message: ERRORS.INVALID_MEMBERS
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

    describe('checkShape', () => {

        test('returns UNEXPECTED_MEMBERS when object has not the correct shape', () => {
            const validator = new ValidatorMock()
            constraints.innerShape = { data: validator }
            const value = { test: 'value' }

            const result = checkShape(constraints, value)

            expect(validator.check.mock.calls.length).toBe(0)
            expect(result).toEqual(errorUnexpected)
        })
        test('returns INVALID_MEMBERS when object content does not match the validators', () => {
            const validator = new ValidatorMock({ state: STATES.ERROR })
            constraints.innerShape = { data: validator }
            const value = { data: 'value' }

            const result = checkShape(constraints, value)

            expect(validator.check.mock.calls.length).toBe(1)
            expect(result).toEqual(errorInvalid)
        })
        test('returns nothing when object matches the expected shape', () => {
            const validator = new ValidatorMock()
            constraints.innerShape = { data: validator }
            const value = { data: 'value' }

            const result = checkShape(constraints, value)

            expect(validator.check.mock.calls.length).toBe(1)
            expect(result).toEqual()
        })
        test('returns nothing when no shape constraint was specified', () => {
            const validator = new ValidatorMock()
            const value = { data: 'value' }

            const result = checkShape(constraints, value)

            expect(validator.check.mock.calls.length).toBe(0)
            expect(result).toEqual()
        })
    })
})

describe('ValidatorObject', () => {

    test('default constructor call', () => {
        expect(new ValidatorObject()).toBeDefined()
    })

    describe('check', () => {
        
        test('returns SUCCESS for a fully valid value', () => {
            const validator = new ValidatorObject().shape({ data: new ValidatorMock() })

            expect(validator.check({ data: 'value' })).toEqual(success)
        })
        test('returns ERROR for an invalid value', () => {
            const validator = new ValidatorObject().shape({ data: new ValidatorMock() })

            expect(validator.check('')).toEqual(errorObject)
            expect(validator.check([])).toEqual(errorObject)
            expect(validator.check({ test: 'value' })).toEqual(errorUnexpected)
        })
    })
})