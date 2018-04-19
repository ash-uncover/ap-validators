import { STATES } from 'validators/ValidatorBase'
import { ERRORS, checkNumber, checkMinValue, checkMaxValue }  from 'validators/ValidatorNumber'
import ValidatorNumber from 'validators/ValidatorNumber'

/* TEST DATA */

let constraints = { ERRORS: ERRORS }

const success = {
	state: STATES.SUCCESS
}
const errorNumber = {
    state: STATES.ERROR,
    message: ERRORS.MUST_BE_A_NUMBER
}
const errorMin = {
    state: STATES.ERROR,
    message: ERRORS.MIN_VALUE_EXCEEDED
}
const errorMax = {
    state: STATES.ERROR,
    message: ERRORS.MAX_VALUE_EXCEEDED
}

/* TEST CASES */

describe('ValidatorNumber exports', () => {

	beforeEach(() => {
		constraints = { ERRORS: ERRORS }
	})

	describe('checkNumber', () => {
		
		test('returns MUST_BE_A_NUMBER error for object value', () => {
			expect(checkNumber(constraints, {})).toEqual(errorNumber)
		})
		test('returns nothing when value is a number', () => {
			expect(checkNumber(constraints, 0)).toEqual()
		})
	})

	describe('checkMinValue', () => {

		beforeEach(() => {
			constraints.minValue = 2
		})
		
		test('returns MIN_LENGTH_EXCEEDED error when value is less than minimum value', () => {
			expect(checkMinValue(constraints, 1)).toEqual(errorMin)
		})
		test('returns nothing when value is greater or equal to minimum value', () => {
			expect(checkNumber(constraints, 2)).toEqual()
		})
	})

	describe('checkMaxValue', () => {

		beforeEach(() => {
			constraints.maxValue = 2
		})
		
		test('returns MAX_VALUE_EXCEEDED error when value is greater than maximum value', () => {
			expect(checkMaxValue(constraints, 3)).toEqual(errorMax)
		})
		test('returns nothing when value is less or equal to maximum value', () => {
			expect(checkMaxValue(constraints, 2)).toEqual()
		})
	})
})

describe('ValidatorNumber', () => {

	describe('default constructor call', () => {
		expect(new ValidatorNumber()).toBeDefined()
	})

	describe('check', () => {
		
		test('returns SUCCESS for a fully valid value', () => {
			const validator = new ValidatorNumber().hasMinValue(2).hasMaxValue(2)
			expect(validator.check(2)).toEqual(success)
		})
        test('returns ERROR for an invalid value', () => {
            const validator = new ValidatorNumber().hasMinValue(5)
            expect(validator.check(2)).toEqual(errorMin)
        })
	})
})