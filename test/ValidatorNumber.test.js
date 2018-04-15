import { STATES } from 'validators/ValidatorBase'
import { ERRORS, check, checkNil, checkNumber, checkMinValue, checkMaxValue }  from 'validators/ValidatorNumber'
import ValidatorNumber from 'validators/ValidatorNumber'

/* TEST DATA */

let constraints = { ERRORS: ERRORS }

const success = {
	state: STATES.SUCCESS
}

/* TEST CASES */

describe('ValidatorNumber exports', () => {

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
				expect(checkNil(constraints, 0)).toEqual()
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
				expect(checkNil(constraints, 0)).toEqual()
			})
		})
	})

	describe('checkNumber', () => {
		
		const error = {
			state: STATES.ERROR,
			message: constraints.ERRORS.MUST_BE_A_NUMBER
		}

		test('returns MUST_BE_A_NUMBER error for object value', () => {
			expect(checkNumber(constraints, {})).toEqual(error)
			expect(check(constraints, {})).toEqual(error)
		})
		test('returns nothing when value is a number', () => {
			expect(checkNumber(constraints, 0)).toEqual()
		})
	})

	describe('checkMinValue', () => {

		const error = {
			state: STATES.ERROR,
			message: constraints.ERRORS.MIN_VALUE_EXCEEDED
		}

		beforeEach(() => {
			constraints.minValue = 2
		})
		
		test('returns MIN_LENGTH_EXCEEDED error when value is less than minimum value', () => {
			expect(checkMinValue(constraints, 1)).toEqual(error)
			expect(check(constraints, 1)).toEqual(error)
		})
		test('returns nothing when value is greater or equal to minimum value', () => {
			expect(checkNumber(constraints, 2)).toEqual()
		})
	})

	describe('checkMaxValue', () => {

		const error = {
			state: STATES.ERROR,
			message: constraints.ERRORS.MAX_VALUE_EXCEEDED
		}

		beforeEach(() => {
			constraints.maxValue = 2
		})
		
		test('returns MAX_VALUE_EXCEEDED error when value is greater than maximum value', () => {
			expect(checkMaxValue(constraints, 3)).toEqual(error)
			expect(check(constraints, 3)).toEqual(error)
		})
		test('returns nothing when value is less or equal to maximum value', () => {
			expect(checkMaxValue(constraints, 2)).toEqual()
		})
	})

	describe('check', () => {

		beforeEach(() => {
			constraints.allowNil = false
			constraints.minLength = 2
			constraints.maxLength = 2
		})
		
		test('returns SUCCESS for a fully valid value', () => {
			expect(check(constraints, 2)).toEqual(success)
		})
	})
})

describe('ValidatorNumber', () => {

	describe('check', () => {
		
		test('returns SUCCESS for a fully valid value', () => {
			const validator = new ValidatorNumber({
				allowNil: false,
				minLength: 2,
				maxLength: 2
			})
			expect(validator.check(2)).toEqual(success)
		})
	})
})