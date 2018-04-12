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

	describe('check', () => {

		test('return default value', () => {
			const value = 'value'
			const validator = new ValidatorBase()
			
			expect(validator.check(value)).toEqual({
				state: 'success',
				message: 'success',
				value: value
			})
		})
	})
})