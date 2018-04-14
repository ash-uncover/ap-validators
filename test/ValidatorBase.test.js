import ValidatorBase from 'validators/ValidatorBase'
import { STATES } from 'validators/ValidatorBase'

describe('STATES', () => {
	
	test('has a "success" entry', () => {
		expect(STATES.SUCCESS).toEqual("success")
	})
	test('has a "info" entry', () => {
		expect(STATES.INFO).toEqual("info")
	})
	test('has a "warning" entry', () => {
		expect(STATES.WARNING).toEqual("warning")
	})
	test('has a "info" entry', () => {
		expect(STATES.ERROR).toEqual("error")
	})
})

describe('ValidatorBase', () => {

	describe('ERRORS', () => {

		test('returns default object when unset', () => {
			const validator = new ValidatorBase()
			
			expect(validator.ERRORS).toEqual({})
		})

		test('can be set through constructor', () => {
			const error = { error: 'error' }
			const validator = new ValidatorBase({ errors: error })
			
			expect(validator.ERRORS).toEqual(error)
		})
	})

	describe('check', () => {

		test('uses default implementation when not specified', () => {
			const value = 'value'
			const validator = new ValidatorBase()
			
			expect(validator.check(value)).toEqual({
				state: 'success'
			})
		})
		test('can be set through constructor', () => {
			const data = { data: 'value' }
			const check = () => data
			const validator = new ValidatorBase({ check: check })
			
			expect(validator.check()).toEqual(data)
		})
	})
})