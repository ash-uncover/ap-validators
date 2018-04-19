import validators from 'index'
import { STATES } from 'index'
import moment from 'moment'

/* TEST DATA */

const success = { state: STATES.SUCCESS }

/* TEST CASES */

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
                expect(validator.check(t)).toEqual({
                    state: STATES.ERROR,
                    message: 'INVALID_EMAIL'
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
        test('return success for valid values', () => {
            expect(validator.check({})).toEqual(success)
            expect(validator.check('')).toEqual(success)
            expect(validator.check(0)).toEqual(success)
            expect(validator.check(false)).toEqual(success)
        })
    })
    
    describe('password', () => {

        beforeEach(() => { validator = validators.password })

        test('returns CONTAIN_FORBIDDEN_CHARS error when the string contains forbidden characters', () => {
            let tests = [
                'à', '@', 'é', '(', '?', '<', '^', '$', 'ù', '=', '/', '*', '-', '+'
            ]
            tests.forEach(t => {
                expect(validator.check('Password1' + t)).toEqual({
                    state: STATES.ERROR,
                    message: 'CONTAIN_FORBIDDEN_CHARS'
                })
            })
        })
        test('returns MUST_CONTAIN_LOWERCASE error when the string does not contains lower case', () => {
            expect(validator.check('PASSWORD1')).toEqual({
                state: STATES.ERROR,
                message: 'MUST_CONTAIN_LOWERCASE'
            })
        })
        test('returns MUST_CONTAIN_UPPERCASE error when the string does not contains upper case', () => {
            expect(validator.check('password1')).toEqual({
                state: STATES.ERROR,
                message: 'MUST_CONTAIN_UPPERCASE'
            })
        })
        test('returns MUST_CONTAIN_SPECIAL error when the string does not contains special chars', () => {
            expect(validator.check('Password')).toEqual({
                state: STATES.ERROR,
                message: 'MUST_CONTAIN_SPECIAL'
            })
        })
        test('return success for valid values', () => {
            expect(validator.check('Password1')).toEqual(success)
        })
    })
    
    describe('phone', () => {

        beforeEach(() => { validator = validators.phone })

        test('returns INVALID_PHONE error when the string is not a valid email', () => {
            const tests = [
                '',            // must have 10 digits 
                '012345678',   // must have 10 digits 
                '01234567890', // must have 10 digits
                '9876543210',  // must start with 0
                '012345678a'   // must contain only digits
            ]

            tests.forEach(t => {
                expect(validator.check(t)).toEqual({
                    state: STATES.ERROR,
                    message: 'INVALID_PHONE'
                })
            })
        })
        test('return success for valid values', () => {
            expect(validator.check('0123456789')).toEqual(success)
        })
    })
})
