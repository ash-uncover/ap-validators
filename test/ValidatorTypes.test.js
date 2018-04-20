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
            expect(ValidatorTypes.any.check()).toEqual(success)
        })
    })

    describe('array', () => {

        test('returns error when value is invalid', () => {
            expect(ValidatorTypes.array.check({}).state).toBe(STATES.ERROR)
        })
        test('returns success when value is valid', () => {
            expect(ValidatorTypes.array.check([])).toEqual(success)
        })
    })

    describe('bool', () => {

        test('returns error when value is invalid', () => {
            expect(ValidatorTypes.bool.check({}).state).toBe(STATES.ERROR)
        })
        test('returns success when value is valid', () => {
            expect(ValidatorTypes.bool.check(false)).toEqual(success)
        })
    })

    describe('number', () => {

        test('returns error when value is invalid', () => {
            expect(ValidatorTypes.number.check({}).state).toBe(STATES.ERROR)
        })
        test('returns success when value is valid', () => {
            expect(ValidatorTypes.number.check(0)).toEqual(success)
        })
    })

    describe('object', () => {

        test('returns error when value is invalid', () => {
            expect(ValidatorTypes.object.check('').state).toBe(STATES.ERROR)
        })
        test('returns success when value is valid', () => {
            expect(ValidatorTypes.object.check({})).toEqual(success)
        })

        describe('complex validators behave properly', () => {
            
            const validator = ValidatorTypes.object.shape({
                member1: ValidatorTypes.string.isRequired,
                member2: ValidatorTypes.number.isRequired.hasMinValue(1),
                member3: ValidatorTypes.bool.isRequired
            })

            test('returns success with a valid value', () => {
                const valueValid = { member1: 'id', member2: 1, member3: true }    

                expect(validator.check(valueValid)).toEqual(success)
            })

            test('returns error with an empty value', () => {
                const valueEmpty = {}    

                expect(validator.check(valueEmpty)).toEqual({ 
                    state: 'error',
                    message: 'INVALID_MEMBERS',
                    shape: {
                        member1: { state: 'error', message: 'CANNOT_BE_NULL' },
                        member2: { state: 'error', message: 'CANNOT_BE_NULL' },
                        member3: { state: 'error', message: 'CANNOT_BE_NULL' } 
                    } 
                })
            })

            test('returns error with an only one invalid value', () => {
                const valueInvalid = { member1: 'id', member2: 0, member3: true } 

                expect(validator.check(valueInvalid)).toEqual({ 
                    state: 'error',
                    message: 'INVALID_MEMBERS',
                    shape: {
                        member1: { state: 'success' },
                        member2: { state: 'error', message: 'MIN_VALUE_EXCEEDED' },
                        member3: { state: 'success' } 
                    } 
                })
            })
        })

        describe('supports nested validators', () => {
            
            const validator = ValidatorTypes.object.shape({
                member1: ValidatorTypes.object.isRequired.shape({
                    member11: ValidatorTypes.string.isRequired,
                    member12: ValidatorTypes.string,
                }),
                member2: ValidatorTypes.object.shape({
                    member21: ValidatorTypes.string.isRequired,
                    member22: ValidatorTypes.string
                }),
            })

            test('returns success with a valid value', () => {
                const valueValid = { 
                    member1: { member11: 'member11', member12: 'member12' }
                }

                expect(validator.check(valueValid)).toEqual(success)
            })

            test('returns error with an invalid value', () => {
                const valueValid = { 
                    member1: { member11: 'member11', member12: 'member12' },
                    member2: { member22: 'member22' }
                }

                expect(validator.check(valueValid)).toEqual({
                    state: STATES.ERROR,
                    message: 'INVALID_MEMBERS',
                    shape: {
                        member1: { state: STATES.SUCCESS },
                        member2: {
                            state: STATES.ERROR,
                            message: 'INVALID_MEMBERS',
                            shape: {
                                member21: { message: 'CANNOT_BE_NULL', state: STATES.ERROR },
                                member22: { state: STATES.SUCCESS }
                            }
                        }
                    }                    
                })
            })
        })
    })

    describe('string', () => {

        test('returns error when value is invalid', () => {
            expect(ValidatorTypes.string.check({}).state).toBe(STATES.ERROR)
        })
        test('returns success when value is valid', () => {
            expect(ValidatorTypes.string.check('')).toEqual(success)
        })
    })

})

