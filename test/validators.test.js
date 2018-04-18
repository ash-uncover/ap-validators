import validators from 'index'
import { STATES } from 'index'
import moment from 'moment'

describe('validators', () => {

	let validator

	test('can be properly imported', () => {
		expect(validators).toBeDefined()
	})

	/* Arrays */

	describe('nonEmptyArray', () => {

		beforeEach(() => { validator = validators.nonEmptyArray })
		
		test('rejected values', () => {
			expect(validator.check({}).state).toEqual(STATES.ERROR)
			expect(validator.check([]).state).toEqual(STATES.ERROR)
		})
		test('accepted values', () => {
			expect(validator.check(['']).state).toEqual(STATES.SUCCESS)
		})
	})

	/* Date */

	describe('beforeToday', () => {

		beforeEach(() => { validator = validators.beforeToday })

		test('rejected values', () => {
			expect(validator.check('').state).toEqual(STATES.ERROR)
			expect(validator.check('').state).toEqual(STATES.ERROR)
			expect(validator.check(moment()).state).toEqual(STATES.ERROR)
		})
		test('accepted values', () => {
			expect(validator.check(moment().subtract(1, 'days')).state).toEqual(STATES.SUCCESS)
		})
	})

	describe('afterToday', () => {

		beforeEach(() => { validator = validators.afterToday })

		test('rejected values', () => {
			expect(validator.check('').state).toEqual(STATES.ERROR)
			expect(validator.check('').state).toEqual(STATES.ERROR)
			expect(validator.check(moment()).state).toEqual(STATES.ERROR)
		})
		test('accepted values', () => {
			expect(validator.check(moment().add(1, 'days')).state).toEqual(STATES.SUCCESS)
		})
	})

	/* Numbers */

	describe('positiveInteger', () => {

		beforeEach(() => { validator = validators.positiveInteger })

		test('rejected values', () => {
			expect(validator.check({}).state).toEqual(STATES.ERROR)
			expect(validator.check('').state).toEqual(STATES.ERROR)
			expect(validator.check(0).state).toEqual(STATES.ERROR)
		})
		test('accepted values', () => {
			expect(validator.check(1).state).toEqual(STATES.SUCCESS)
		})
	})

	/* String */

	describe('nonEmptyString', () => {

		beforeEach(() => { validator = validators.nonEmptyString })

		test('rejected values', () => {
			expect(validator.check({}).state).toEqual(STATES.ERROR)
			expect(validator.check('').state).toEqual(STATES.ERROR)
		})
		test('accepted values', () => {
			expect(validator.check('a').state).toEqual(STATES.SUCCESS)
		})
	})
	describe('tweet', () => {

		beforeEach(() => { validator = validators.tweet })

		test('rejected values', () => {
			const value = '0123456789012345678901234567890123456789' +
				'0123456789012345678901234567890123456789' +
				'0123456789012345678901234567890123456789' +
				'0123456789012345678901234567890123456789'
			expect(validator.check(value).state).toEqual(STATES.ERROR)
		})
		test('accepted values', () => {
			expect(validator.check('').state).toEqual(STATES.SUCCESS)
		})
	})

	/* Specials */

	describe('email', () => {

		beforeEach(() => { validator = validators.email })

        test('returns INVALID_EMAIL error when the string is not a valid email', () => {
            const tests = [
                '@test.com', 
                'kiko@.com', 
                'kiko@test.', 
                'kikotest.fr', 
                'kiko@testfr', 
                'ki@ko@test.fr'
            ]

            tests.forEach(t => {
                expect(validator.check('mail').state).toEqual({
                    state: STATES.ERROR,
                    error: 'INVALID_EMAIL'
                })   
            })
        })
		test('return success for valid values', () => {
			expect(validator.check('mail@mail.com').state).toEqual(STATES.SUCCESS)
		})
	})
	
	describe('nonNull', () => {

		beforeEach(() => { validator = validators.nonNull })

		test('rejected values', () => {
			expect(validator.check(null).state).toEqual(STATES.ERROR)
		})
		test('accepted values', () => {
			expect(validator.check({}).state).toEqual(STATES.SUCCESS)
			expect(validator.check('').state).toEqual(STATES.SUCCESS)
			expect(validator.check(0).state).toEqual(STATES.SUCCESS)
			expect(validator.check(false).state).toEqual(STATES.SUCCESS)
		})
	})
	
	describe('password', () => {

		beforeEach(() => { validator = validators.password })

		test('rejected values', () => {
			expect(validator.check('password').state).toEqual(STATES.ERROR)
		})
		test('accepted values', () => {
			expect(validator.check('Password1').state).toEqual(STATES.SUCCESS)
		})
	})
	
	describe('phone', () => {

		beforeEach(() => { validator = validators.phone })

		test('rejected values', () => {
			expect(validator.check('9876543210').state).toEqual(STATES.ERROR)
		})
		test('accepted values', () => {
			expect(validator.check('0123456789').state).toEqual(STATES.SUCCESS)
		})
	})
})
