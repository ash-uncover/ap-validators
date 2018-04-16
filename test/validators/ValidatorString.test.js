import { STATES } from 'validators/ValidatorBase'
import { ERRORS, check, checkNil, checkString, checkMinLength, checkMaxLength }  from 'validators/ValidatorString'
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

	describe('checkNil', () => {

		describe('when validator does not allow nil values', () => {

			const error = {
				state: STATES.ERROR,
				message: constraints.ERRORS.CANNOT_BE_NULL
			}

			test('returns CANNOT_BE_NULL error for undefined value', () => {
				expect(checkNil(constraints, undefined)).toEqual(error)
				expect(check(constraints, undefined)).toEqual(error)
			})
			test('returns CANNOT_BE_NULL error for null value', () => {
				expect(checkNil(constraints, null)).toEqual(error)
				expect(check(constraints, null)).toEqual(error)
			})
			test('returns nothing for defined value', () => {
				expect(checkNil(constraints, '')).toEqual()
			})
		})

		describe('when validator allows nil values', () => {

			beforeEach(() => {
				constraints.allowNil = true
			})

			test('returns SUCCESS for undefined value', () => {
				expect(checkNil(constraints, undefined)).toEqual(success)
				expect(check(constraints, undefined)).toEqual(success)
			})
			test('returns SUCCESS for null value', () => {
				expect(checkNil(constraints, null)).toEqual(success)
				expect(check(constraints, null)).toEqual(success)
			})
			test('returns nothing for defined value', () => {
				expect(checkNil(constraints, '')).toEqual()
			})
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
		test('returns nothing when value is a string', () => {
			expect(checkString(constraints, '')).toEqual()
		})
	})

	describe('checkMinLength', () => {

		const error = {
			state: STATES.ERROR,
			message: constraints.ERRORS.MIN_LENGTH_EXCEEDED
		}

		beforeEach(() => {
			constraints.minLength = 1
		})
		
		test('returns MIN_LENGTH_EXCEEDED error when string is too short', () => {
			expect(checkMinLength(constraints, '')).toEqual(error)
			expect(check(constraints, '')).toEqual(error)
		})
		test('returns nothing when string length is correct', () => {
			expect(checkString(constraints, 'v')).toEqual()
		})
	})

	describe('checkMaxLength', () => {

		const error = {
			state: STATES.ERROR,
			message: constraints.ERRORS.MAX_LENGTH_EXCEEDED
		}

		beforeEach(() => {
			constraints.maxLength = 1
		})
		
		test('returns MAX_LENGTH_EXCEEDED error when string is too long', () => {
			expect(checkMaxLength(constraints, 'va')).toEqual(error)
			expect(check(constraints, 'va')).toEqual(error)
		})
		test('returns nothing when string length is correct', () => {
			expect(checkMaxLength(constraints, 'v')).toEqual()
		})
	})

	describe('check', () => {

		beforeEach(() => {
			constraints.allowNil = false
			constraints.minLength = 2
			constraints.maxLength = 2
		})
		
		test('returns SUCCESS for a fully valid value', () => {
			expect(check(constraints, 'va')).toEqual(success)
		})
	})
})

describe('ValidatorString', () => {

	describe('default constructor call', () => {
		expect(new ValidatorString()).toBeDefined()
	})

	describe('check', () => {
		
		test('returns SUCCESS for a fully valid value', () => {
			const validator = new ValidatorString({
				allowNil: false,
				minLength: 2,
				maxLength: 2
			})
			expect(validator.check('va')).toEqual(success)
		})
	})
})