import { STATES } from 'validators/ValidatorBase'
import { ERRORS, checkBool }  from 'validators/ValidatorBool'
import ValidatorBool from 'validators/ValidatorBool'

/* TEST DATA */

let constraints = { ERRORS: ERRORS }

const success = {
	state: STATES.SUCCESS
}

/* TEST CASES */

describe('ValidatorBool exports', () => {

	beforeEach(() => {
		constraints = { ERRORS: ERRORS }
	})

	describe('checkBool', () => {
		
		const error = {
			state: STATES.ERROR,
			message: ERRORS.MUST_BE_A_BOOLEAN
		}

		test('returns MUST_BE_A_BOOLEAN error for object value', () => {
			expect(checkBool(constraints, {})).toEqual(error)
		})
		test('returns MUST_BE_A_BOOLEAN error for string value', () => {
			expect(checkBool(constraints, '')).toEqual(error)
		})
		test('returns nothing when value is a boolean', () => {
			expect(checkBool(constraints, false)).toEqual()
		})
	})
})

describe('ValidatorBool', () => {

	test('default constructor call', () => {
		expect(new ValidatorBool()).toBeDefined()
	})

	describe('check', () => {
		
		test('returns SUCCESS for a fully valid value', () => {
			const validator = new ValidatorBool()
			expect(validator.check(true)).toEqual(success)
			expect(validator.check(false)).toEqual(success)
		})
        test('returns ERROR for an invalid value', () => {
            const validator = new ValidatorBool()
            expect(validator.check('')).toEqual({
                state: STATES.ERROR,
                message: ERRORS.MUST_BE_A_BOOLEAN
            })
            expect(validator.check(0)).toEqual({
                state: STATES.ERROR,
                message: ERRORS.MUST_BE_A_BOOLEAN
            })
        })
	})
})