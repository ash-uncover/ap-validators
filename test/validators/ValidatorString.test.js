import { STATES } from 'validators/ValidatorBase'
import { ERRORS, checkString, checkMinLength, checkMaxLength, checkMatch, checkMatchNot }  from 'validators/ValidatorString'
import ValidatorString from 'validators/ValidatorString'

/* TEST DATA */

let constraints = { ERRORS: ERRORS }

const success = {
	state: STATES.SUCCESS
}
const errorString = {
    state: STATES.ERROR,
    message: ERRORS.MUST_BE_A_STRING
}
const errorMin = {
    state: STATES.ERROR,
    message: ERRORS.MIN_LENGTH_EXCEEDED
}
const errorMax = {
    state: STATES.ERROR,
    message: ERRORS.MAX_LENGTH_EXCEEDED
}
const errorMatch = {
    state: STATES.ERROR,
    message: 'MUST_MATCH_REGEX'
}
const errorNotMatch = {
    state: STATES.ERROR,
    message: 'MUST_NOT_MATCH_REGEX'
}

/* TEST CASES */

describe('ValidatorString exports', () => {

	beforeEach(() => {
		constraints = { ERRORS: ERRORS }
	})

	describe('checkString', () => {

		test('returns MUST_BE_A_STRING error for object value', () => {
			expect(checkString(constraints, {})).toEqual(errorString)
		})
		test('returns nothing when value is a string', () => {
			expect(checkString(constraints, '')).toEqual()
		})
	})

	describe('checkMinLength', () => {

		beforeEach(() => {
			constraints.minLength = 1
		})
		
		test('returns MIN_LENGTH_EXCEEDED error when string is too short', () => {
			expect(checkMinLength(constraints, '')).toEqual(errorMin)
		})
		test('returns nothing when string length is correct', () => {
			expect(checkString(constraints, 'v')).toEqual()
		})
	})

	describe('checkMaxLength', () => {

		beforeEach(() => {
			constraints.maxLength = 1
		})
		
		test('returns MAX_LENGTH_EXCEEDED error when string is too long', () => {
			expect(checkMaxLength(constraints, 'va')).toEqual(errorMax)
		})
		test('returns nothing when string length is correct', () => {
			expect(checkMaxLength(constraints, 'v')).toEqual()
		})
	})

    describe('checkMatch', () => {

        beforeEach(() => {
            constraints.match = [
                { regex: /^[0-9]{2}$/, error: 'MUST_MATCH_REGEX' }
            ]
        })
        
        test('returns MUST_MATCH_REGEX error when string does not match the regex', () => {
            expect(checkMatch(constraints, '1')).toEqual(errorMatch)
        })
        test('returns nothing when string length is correct', () => {
            expect(checkMatch(constraints, '12')).toEqual()
        })
    })

    describe('checkMatchNot', () => {

        beforeEach(() => {
            constraints.matchNot = [
                { regex: /^[0-9]{2}$/, error: 'MUST_NOT_MATCH_REGEX' }
            ]
        })
        
        test('returns MUST_MATCH_REGEX error when string does not match the regex', () => {
            expect(checkMatchNot(constraints, '12')).toEqual(errorNotMatch)
        })
        test('returns nothing when string length is correct', () => {
            expect(checkMatchNot(constraints, 'a1')).toEqual()
        })
    })
})

describe('ValidatorString', () => {

	describe('default constructor call', () => {
		expect(new ValidatorString()).toBeDefined()
	})

	describe('check', () => {
		
		test('returns SUCCESS for a fully valid value', () => {
			const validator = new ValidatorString().hasMinLength(2).hasMaxLength(2)
			expect(validator.check('va')).toEqual(success)
		})
        test('returns ERROR for an invalid value', () => {
            const validator = new ValidatorString().hasMinLength(2)
            expect(validator.check('a')).toEqual(errorMin)
        })
	})
})