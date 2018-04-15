import { STATES } from 'validators/ValidatorBase'
import { ERRORS, check, checkNil }  from 'validators/ValidatorNonNull'
import ValidatorNonNull from 'validators/ValidatorNonNull'

/* TEST DATA */

let constraints = { ERRORS: ERRORS }

const success = {
	state: STATES.SUCCESS
}

/* TEST CASES */

describe('ValidatorNonNull exports', () => {

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
				expect(checkNil(constraints, {})).toEqual()
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
				expect(checkNil(constraints, {})).toEqual()
			})
		})
	})
})

describe('ValidatorNonNull', () => {

	describe('default constructor call', () => {
		expect(new ValidatorNonNull()).toBeDefined()
	})

	describe('check', () => {

		test('returns SUCCESS for defined value', () => {
			const validator = new ValidatorNonNull({})
			expect(validator.check({})).toEqual(success)
		})
	})
})