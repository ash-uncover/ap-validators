import { STATES, checkNil } from 'validators/ValidatorBase'
import { ERRORS, check, checkString, checkRegex }  from 'validators/ValidatorEmail'
import ValidatorEmail from 'validators/ValidatorEmail'

/* TEST DATA */

let constraints = { ERRORS: ERRORS }

const success = {
	state: STATES.SUCCESS
}

/* TEST CASES */

describe('ValidatorEmail exports', () => {

	beforeEach(() => {
		constraints = { ERRORS: ERRORS }
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
			message: constraints.ERRORS.INVALID_EMAIL
		}

		test('returns INVALID_EMAIL error when the string is not a valid email', () => {
			const tests = ['@test.com', 'kiko@.com', 'kiko@test.', 'kikotest.fr', 'kiko@testfr', 'ki@ko@test.fr']

			tests.forEach(t => {
				expect(checkRegex(constraints, t)).toEqual(error)	
				expect(check(constraints, t)).toEqual(error)
			})
		})
		test('returns nothing for valid value', () => {
			expect(checkRegex(constraints, 'kiko@test.fr')).toEqual()
		})
	})

	describe('check', () => {

		test('returns SUCCESS for valid value', () => {
			expect(check(constraints, 'kiko@test.fr')).toEqual(success)
		})
	})
})

describe('ValidatorEmail', () => {

	describe('default constructor call', () => {
		expect(new ValidatorEmail()).toBeDefined()
	})

	describe('check', () => {
		
		test('returns SUCCESS for a fully valid value', () => {
			const validator = new ValidatorEmail()
			expect(validator.check('mymail@super.com')).toEqual(success)
		})
	})
})