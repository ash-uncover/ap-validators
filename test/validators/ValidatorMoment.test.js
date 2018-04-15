import { STATES } from 'validators/ValidatorBase'
import { ERRORS, check, checkNil, checkMoment, checkMinMoment, checkMaxMoment }  from 'validators/ValidatorMoment'
import ValidatorMoment from 'validators/ValidatorMoment'

import moment from 'moment'

/* TEST DATA */

let constraints = { ERRORS: ERRORS }

const success = {
	state: STATES.SUCCESS
}

const yesterday = moment().subtract(1, 'days')
const now = moment()
const tomorow = moment().add(1, 'days')

/* TEST CASES */

describe('ValidatorMoment exports', () => {

	beforeEach(() => {
		constraints = { ERRORS: ERRORS }
	})

	describe('checkNil', () => {

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
			expect(checkNil(constraints, now)).toEqual()
		})
	})

	describe('checkMoment', () => {
		
		const error = {
			state: STATES.ERROR,
			message: constraints.ERRORS.MUST_BE_A_MOMENT
		}

		test('returns MUST_BE_A_MOMENT error for object value', () => {
			expect(checkMoment(constraints, {})).toEqual(error)
		})
		test('returns MUST_BE_A_MOMENT error for string value', () => {
			expect(checkMoment(constraints, '')).toEqual(error)
		})
		test('returns nothing when value is a moment', () => {
			expect(checkMoment(constraints, now)).toEqual()
		})
	})

	describe('checkMinMoment', () => {

		const error = {
			state: STATES.ERROR,
			message: constraints.ERRORS.MIN_MOMENT_EXCEEDED
		}

		beforeEach(() => {
			constraints.minMoment = now
		})
		
		test('returns MIN_MOMENT_EXCEEDED error when moment is before min moment', () => {
			expect(checkMinMoment(constraints, yesterday)).toEqual(error)
			expect(check(constraints, yesterday)).toEqual(error)
		})
		test('returns nothing when moment is the same as min moment', () => {
			expect(checkMoment(constraints, now)).toEqual()
		})
		test('returns nothing when moment is the after min moment', () => {
			expect(checkMoment(constraints, tomorow)).toEqual()
		})
	})

	describe('checkMaxMoment', () => {

		const error = {
			state: STATES.ERROR,
			message: constraints.ERRORS.MAX_MOMENT_EXCEEDED
		}

		beforeEach(() => {
			constraints.maxMoment = now
		})
		
		test('returns MAX_MOMENT_EXCEEDED error when moment is after max moment', () => {
			expect(checkMaxMoment(constraints, tomorow)).toEqual(error)
			expect(check(constraints, tomorow)).toEqual(error)
		})
		test('returns nothing when moment is the same as max moment', () => {
			expect(checkMaxMoment(constraints, now)).toEqual()
		})
		test('returns nothing when moment is before max moment', () => {
			expect(checkMaxMoment(constraints, yesterday)).toEqual()
		})
	})

	describe('check', () => {

		beforeEach(() => {
			constraints.minMoment = yesterday
			constraints.maxMoment = tomorow
		})
		
		test('returns SUCCESS for a fully valid value', () => {
			expect(check(constraints, now)).toEqual(success)
		})
	})
})

describe('ValidatorMoment', () => {

	describe('default constructor call', () => {
		expect(new ValidatorMoment()).toBeDefined()
	})

	describe('check', () => {
		
		test('returns SUCCESS for a fully valid value', () => {
			const validator = new ValidatorMoment({
				minMoment: yesterday,
				maxMoment: tomorow
			})
			expect(validator.check(now)).toEqual(success)
		})
	})
})