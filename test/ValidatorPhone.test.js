import { STATES } from 'validators/ValidatorBase'
import { ERRORS, check, checkNil, checkString, checkRegex }  from 'validators/ValidatorPhone'
import ValidatorPhone from 'validators/ValidatorPhone'

/* TEST DATA */

let constraints = { ERRORS: ERRORS }

const success = {
	state: STATES.SUCCESS
}

/* TEST CASES */

describe('ValidatorPhone exports', () => {

	beforeEach(() => {
		constraints = { ERRORS: ERRORS }
	})

	describe('checkNil', () => {

		const error = {
			state: STATES.ERROR,
			message: constraints.ERRORS.INVALID_PHONE
		}

		test('returns INVALID_PHONE error for undefined value', () => {
			expect(checkNil(constraints, undefined)).toEqual(error)
			expect(check(constraints, undefined)).toEqual(error)
		})
		test('returns INVALID_PHONE error for null value', () => {
			expect(checkNil(constraints, null)).toEqual(error)
			expect(check(constraints, null)).toEqual(error)
		})
		test('returns nothing for defined value', () => {
			expect(checkNil(constraints, '')).toEqual()
		})
	})

	describe('checkString', () => {

		const error = {
			state: STATES.ERROR,
			message: constraints.ERRORS.MUST_BE_A_STRING
		}

		test('returns MUST_BE_A_STRING error for object value', () => {
			expect(checkString(constraints, {})).toEqual(error)
			expect(check(constraints, {})).toEqual(error)
		})
		test('returns nothing for string value', () => {
			expect(checkString(constraints, '')).toEqual()
		})
	})

	describe('checkRegex', () => {

		const error = {
			state: STATES.ERROR,
			message: constraints.ERRORS.INVALID_PHONE
		}

		test('returns INVALID_PHONE error when the string is not a valid email', () => {
			const tests = [
				'',            // must have 10 digits 
				'012345678',   // must have 10 digits 
				'01234567890', // must have 10 digits
				'9876543210',  // must start with 0
				'012345678a'   // must contain only digits
			]

			tests.forEach(t => {
				expect(checkRegex(constraints, t)).toEqual(error)	
				expect(check(constraints, t)).toEqual(error)
			})
		})
		test('returns nothing for valid value', () => {
			expect(checkRegex(constraints, '0123456789')).toEqual()
		})
	})

	describe('check', () => {

		test('returns SUCCESS for valid value', () => {
			expect(check(constraints, '0123456789')).toEqual(success)
		})
	})
})

describe('ValidatorPhone', () => {

	describe('check', () => {
		
		test('returns SUCCESS for a fully valid value', () => {
			const validator = new ValidatorPhone()
			expect(validator.check('0123456789')).toEqual(success)
		})
	})
})