import ValidatorTypes from 'index'
import { STATES } from 'index'

/* TEST DATA */

const success = { state: STATES.SUCCESS }

/* TEST CASES */

describe('ValidatorTypes', () => {

    test('can be properly imported', () => {
        expect(ValidatorTypes).toBeDefined()
    })

    describe('any', () => {

        test('returns error when value is invalid', () => {
            expect(ValidatorTypes.any.isRequired.check().state).toBe(STATES.ERROR)
        })
        test('returns success when value is valid', () => {
            expect(ValidatorTypes.any.check().state).toBe(STATES.SUCCESS)
        })
    })

    describe('array', () => {

        test('returns error when value is invalid', () => {
            expect(ValidatorTypes.array.check({}).state).toBe(STATES.ERROR)
        })
        test('returns success when value is valid', () => {
            expect(ValidatorTypes.array.check([]).state).toBe(STATES.SUCCESS)
        })
    })

    describe('bool', () => {

        test('returns error when value is invalid', () => {
            expect(ValidatorTypes.bool.check({}).state).toBe(STATES.ERROR)
        })
        test('returns success when value is valid', () => {
            expect(ValidatorTypes.bool.check(false).state).toBe(STATES.SUCCESS)
        })
    })

    describe('number', () => {

        test('returns error when value is invalid', () => {
            expect(ValidatorTypes.number.check({}).state).toBe(STATES.ERROR)
        })
        test('returns success when value is valid', () => {
            expect(ValidatorTypes.number.check(0).state).toBe(STATES.SUCCESS)
        })
    })

    describe('object', () => {

        test('returns error when value is invalid', () => {
            expect(ValidatorTypes.object.check('').state).toBe(STATES.ERROR)
        })
        test('returns success when value is valid', () => {
            expect(ValidatorTypes.object.check({}).state).toBe(STATES.SUCCESS)
        })
    })

    describe('string', () => {

        test('returns error when value is invalid', () => {
            expect(ValidatorTypes.string.check({}).state).toBe(STATES.ERROR)
        })
        test('returns success when value is valid', () => {
            expect(ValidatorTypes.string.check('').state).toBe(STATES.SUCCESS)
        })
    })

})
