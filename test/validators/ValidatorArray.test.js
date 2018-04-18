import { STATES } from 'validators/ValidatorBase'
import { ERRORS, checkArray, checkMinLength, checkMaxLength }  from 'validators/ValidatorArray'
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

	describe('checkArray', () => {
		
		const error = {
			state: STATES.ERROR,
			message: ERRORS.MUST_BE_AN_ARRAY
		}

		test('returns MUST_BE_AN_ARRAY error for object value', () => {
			expect(checkArray(constraints, {})).toEqual(error)
		})
		test('returns MUST_BE_AN_ARRAY error for string value', () => {
			expect(checkArray(constraints, '')).toEqual(error)
		})
		test('returns nothing when value is an array', () => {
			expect(checkArray(constraints, [])).toEqual()
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
		
		test('returns MIN_LENGTH_EXCEEDED error when array does not contain enough values', () => {
			expect(checkMinLength(constraints, [])).toEqual(error)
		})
		test('returns nothing when array contains enough element', () => {
			expect(checkArray(constraints, ['value'])).toEqual()
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
		
		test('returns MAX_LENGTH_EXCEEDED error when array contains more values than specified', () => {
			expect(checkMaxLength(constraints, ['value1','value2'])).toEqual(error)
		})
		test('returns nothing when array contains enough element', () => {
			expect(checkMaxLength(constraints, ['value'])).toEqual()
		})
	})
})

describe('ValidatorArray', () => {

	test('default constructor call', () => {
		expect(new ValidatorArray()).toBeDefined()
	})

	describe('check', () => {
		
		test('returns SUCCESS for a fully valid value', () => {
			const validator = new ValidatorArray().hasMinLength(2).hasMaxLength(2)
			expect(validator.check(['value1','value2'])).toEqual(success)
		})
        test('returns ERROR for an invalid array', () => {
            const validator = new ValidatorArray().hasMinLength(2).hasMaxLength(2)
            expect(validator.check(['value1','value2','value3'])).toEqual({
                state: STATES.ERROR,
                message: ERRORS.MAX_LENGTH_EXCEEDED
            })
        })
	})
})