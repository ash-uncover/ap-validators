import { STATES } from 'validators/ValidatorBase'
import { ERRORS, checkString, checkMinLength, checkMaxLength, checkMatch, checkMatchNot }  from 'validators/ValidatorString'
import ValidatorString from 'validators/ValidatorString'

/* TEST DATA */

let constraints = { ERRORS: ERRORS }

const success = {
	state: STATES.SUCCESS
}

/* TEST CASES */

describe('ValidatorString exports', () => {

	beforeEach(() => {
		constraints = { ERRORS: ERRORS }
	})

	describe('checkString', () => {
		
		const error = {
			state: STATES.ERROR,
			message: ERRORS.MUST_BE_A_STRING
		}

		test('returns MUST_BE_A_STRING error for object value', () => {
			expect(checkString(constraints, {})).toEqual(error)
		})
		test('returns nothing when value is a string', () => {
			expect(checkString(constraints, '')).toEqual()
		})
	})

	describe('checkMinLength', () => {

		const error = {
			state: STATES.ERROR,
			message: ERRORS.MIN_LENGTH_EXCEEDED
		}

		beforeEach(() => {
			constraints.minLength = 1
		})
		
		test('returns MIN_LENGTH_EXCEEDED error when string is too short', () => {
			expect(checkMinLength(constraints, '')).toEqual(error)
		})
		test('returns nothing when string length is correct', () => {
			expect(checkString(constraints, 'v')).toEqual()
		})
	})

	describe('checkMaxLength', () => {

		const error = {
			state: STATES.ERROR,
			message: ERRORS.MAX_LENGTH_EXCEEDED
		}

		beforeEach(() => {
			constraints.maxLength = 1
		})
		
		test('returns MAX_LENGTH_EXCEEDED error when string is too long', () => {
			expect(checkMaxLength(constraints, 'va')).toEqual(error)
		})
		test('returns nothing when string length is correct', () => {
			expect(checkMaxLength(constraints, 'v')).toEqual()
		})
	})

    describe('checkMatch', () => {

        const error = {
            state: STATES.ERROR,
            message: 'MUST_MATCH_REGEX'
        }

        beforeEach(() => {
            constraints.match = [
                { regex: /^[0-9]{2}$/, error: 'MUST_MATCH_REGEX' }
            ]
        })
        
        test('returns MUST_MATCH_REGEX error when string does not match the regex', () => {
            expect(checkMatch(constraints, '1')).toEqual(error)
        })
        test('returns nothing when string length is correct', () => {
            expect(checkMatch(constraints, '12')).toEqual()
        })
    })

    describe('checkMatchNot', () => {

        const error = {
            state: STATES.ERROR,
            message: 'MUST_NOT_MATCH_REGEX'
        }

        beforeEach(() => {
            constraints.matchNot = [
                { regex: /^[0-9]{2}$/, error: 'MUST_NOT_MATCH_REGEX' }
            ]
        })
        
        test('returns MUST_MATCH_REGEX error when string does not match the regex', () => {
            expect(checkMatchNot(constraints, '12')).toEqual(error)
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
            expect(validator.check('a')).toEqual({
                state: STATES.ERROR,
                message: ERRORS.MIN_LENGTH_EXCEEDED
            })
        })
	})
})