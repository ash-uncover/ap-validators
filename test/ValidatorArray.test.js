import { STATES } from 'validators/ValidatorBase'
import { ERRORS, check, checkNil, checkArray, checkMinLength, checkMaxLength }  from 'validators/ValidatorArray'
import ValidatorArray from 'validators/ValidatorArray'

/* TEST DATA */

let constraints = { ERRORS: ERRORS }

const success = {
	state: STATES.SUCCESS
}

/* TEST CASES */

describe('ValidatorArray exports', () => {

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
				expect(checkNil(constraints, [])).toEqual()
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
				expect(checkNil(constraints, [])).toEqual()
			})
		})
	})

	describe('checkArray', () => {
		
		const error = {
			state: STATES.ERROR,
			message: constraints.ERRORS.MUST_BE_AN_ARRAY
		}

		test('returns MUST_BE_AN_ARRAY error for object value', () => {
			expect(checkArray(constraints, {})).toEqual(error)
			expect(check(constraints, {})).toEqual(error)
		})
		test('returns MUST_BE_AN_ARRAY error for string value', () => {
			expect(checkArray(constraints, '')).toEqual(error)
			expect(check(constraints, '')).toEqual(error)
		})
		test('returns nothing when value is an array', () => {
			expect(checkArray(constraints, [])).toEqual()
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
		
		test('returns MIN_LENGTH_EXCEEDED error when array does not contain enough values', () => {
			expect(checkMinLength(constraints, [])).toEqual(error)
			expect(check(constraints, [])).toEqual(error)
		})
		test('returns nothing when array contains enough element', () => {
			expect(checkArray(constraints, ['value'])).toEqual()
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
		
		test('returns MAX_LENGTH_EXCEEDED error when array contains more values than specified', () => {
			expect(checkMaxLength(constraints, ['value1','value2'])).toEqual(error)
			expect(check(constraints, ['value1','value2'])).toEqual(error)
		})
		test('returns nothing when array contains enough element', () => {
			expect(checkMaxLength(constraints, ['value'])).toEqual()
		})
	})

	describe('check', () => {

		beforeEach(() => {
			constraints.allowNil = false
			constraints.minLength = 2
			constraints.maxLength = 2
		})
		
		test('returns SUCCESS for a fully valid value', () => {
			expect(check(constraints, ['value1','value2'])).toEqual(success)
		})
	})
})

describe('ValidatorArray', () => {

	describe('default constructor call', () => {
		expect(new ValidatorArray()).toBeDefined()
	})

	describe('check', () => {
		
		test('returns SUCCESS for a fully valid value', () => {
			const validator = new ValidatorArray({
				allowNil: false,
				minLength: 2,
				maxLength: 2
			})
			expect(validator.check(['value1','value2'])).toEqual(success)
		})
	})
})