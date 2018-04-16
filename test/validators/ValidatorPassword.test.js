import { STATES } from 'validators/ValidatorBase'
import { ERRORS, check, checkString, checkLength, checkCharsAllowed, checkCharsLower, checkCharsUpper, checkCharsSpecial }  from 'validators/ValidatorPassword'
import ValidatorPassword from 'validators/ValidatorPassword'

/* TEST DATA */

let constraints = { ERRORS: ERRORS }

const success = {
	state: STATES.SUCCESS
}

/* TEST CASES */

describe('ValidatorPassword exports', () => {

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
		test('returns nothing when value is a string', () => {
			expect(checkString(constraints, '')).toEqual()
		})
	})

	describe('checkLength', () => {

		const error = {
			state: STATES.ERROR,
			message: constraints.ERRORS.MIN_LENGTH_EXCEEDED
		}

		test('returns MIN_LENGTH_EXCEEDED error for shorter value', () => {
			expect(checkLength(constraints, 'passwor')).toEqual(error)
			expect(check(constraints, 'passwor')).toEqual(error)
		})
		test('returns nothing for values with 8 length or more', () => {
			expect(checkLength(constraints, 'password')).toEqual()
			expect(checkLength(constraints, 'password1')).toEqual()
		})
	})

	describe('checkCharsAllowed', () => {
		
		const error = {
			state: STATES.ERROR,
			message: constraints.ERRORS.CONTAIN_FORBIDDEN_CHARS
		}

		test('returns CONTAIN_FORBIDDEN_CHARS error for values with forbidden chars', () => {
			let values = [
				'à', '@', 'é', '(', '?', '<', '^', '$', 'ù', '=', '/', '*', '-', '+'
			]

			for (let i = 0; i < values.length; i++) {
				expect(checkCharsAllowed(constraints, values[i])).toEqual(error)
				expect(check(constraints, '1234567' + values[i])).toEqual(error)	
			}
		})
		test('returns nothing when value contains only allowed chars', () => {
			expect(checkCharsAllowed(constraints, 'A1z_')).toEqual()
		})
	})

	describe('checkCharsLower', () => {
		
		const error = {
			state: STATES.ERROR,
			message: constraints.ERRORS.MUST_CONTAIN_LOWERCASE
		}

		test('returns MUST_CONTAIN_LOWERCASE error for value with no lower case', () => {
			expect(checkCharsLower(constraints, 'PASSWORD')).toEqual(error)
			expect(check(constraints, 'PASSWORD')).toEqual(error)
		})
		test('returns nothing when value contains lower case', () => {
			expect(checkCharsLower(constraints, 'p')).toEqual()
		})
	})

	describe('checkCharsUpper', () => {
		
		const error = {
			state: STATES.ERROR,
			message: constraints.ERRORS.MUST_CONTAIN_UPPERCASE
		}

		test('returns MUST_CONTAIN_UPPERCASE error for value with no upper case', () => {
			expect(checkCharsUpper(constraints, 'password')).toEqual(error)
			expect(check(constraints, 'password')).toEqual(error)
		})
		test('returns nothing when value contains upper case', () => {
			expect(checkCharsUpper(constraints, 'P')).toEqual()
		})
	})

	describe('checkCharsSpecial', () => {
		
		const error = {
			state: STATES.ERROR,
			message: constraints.ERRORS.MUST_CONTAIN_SPECIAL
		}

		test('returns MUST_CONTAIN_SPECIAL error for value with no special char', () => {
			expect(checkCharsSpecial(constraints, 'Password')).toEqual(error)
			expect(check(constraints, 'Password')).toEqual(error)
		})
		test('returns nothing when value contains special char', () => {
			expect(checkCharsSpecial(constraints, '1')).toEqual()
			expect(checkCharsSpecial(constraints, '_')).toEqual()
		})
	})

	describe('check', () => {
		
		test('returns SUCCESS for a fully valid value', () => {
			expect(check(constraints, 'Password_1')).toEqual(success)
		})
	})
})

describe('ValidatorPassword', () => {

	describe('default constructor call', () => {
		expect(new ValidatorPassword()).toBeDefined()
	})

	describe('check', () => {
		
		test('returns SUCCESS for a fully valid value', () => {
			const validator = new ValidatorPassword()
			expect(validator.check('Password_1')).toEqual(success)
		})
	})
})