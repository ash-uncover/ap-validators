import { STATES } from 'validators/ValidatorBase'
import { ERRORS, checkDate, checkAfter, checkBefore }  from 'validators/ValidatorDate'
import ValidatorDate from 'validators/ValidatorDate'

import moment from 'moment'

/* TEST DATA */

let constraints = { ERRORS: ERRORS }

const success = {
    state: STATES.SUCCESS
}
const errorDate = {
    state: STATES.ERROR,
    message: ERRORS.MUST_BE_A_DATE
}
const errorMin = {
    state: STATES.ERROR,
    message: constraints.ERRORS.MIN_DATE_EXCEEDED
}
const errorMax = {
    state: STATES.ERROR,
    message: constraints.ERRORS.MAX_DATE_EXCEEDED
}

const yesterday = moment().startOf('day').subtract(1, 'days')
const now = moment().startOf('day')
const tomorow = moment().startOf('day').add(1, 'days')

/* TEST CASES */

describe('ValidatorDate exports', () => {

    beforeEach(() => {
        constraints = { ERRORS: ERRORS }
    })

    describe('checkDate', () => {
        
        test('returns MUST_BE_A_MOMENT error for object value', () => {
            expect(checkDate(constraints, {})).toEqual(errorDate)
        })
        test('returns MUST_BE_A_MOMENT error for string value', () => {
            expect(checkDate(constraints, '')).toEqual(errorDate)
        })
        test('returns nothing when value is a moment', () => {
            expect(checkDate(constraints, now)).toEqual()
        })
    })

    describe('checkAfter', () => {

        beforeEach(() => {
            constraints.after = now
        })
        
        test('returns MIN_DATE_EXCEEDED error when moment is before min date', () => {
            expect(checkAfter(constraints, yesterday)).toEqual(errorMin)
        })
        test('returns MIN_DATE_EXCEEDED error when moment is the same as min date', () => {
            expect(checkAfter(constraints, now)).toEqual(errorMin)
        })
        test('returns nothing when inclusive and moment is the same as min date', () => {
            constraints.afterInclusive = true
            expect(checkAfter(constraints, now)).toEqual()
        })
        test('returns nothing when moment is the after min date', () => {
            expect(checkAfter(constraints, tomorow)).toEqual()
        })
    })

    describe('checkBefore', () => {

        beforeEach(() => {
            constraints.before = now
        })
        
        test('returns MAX_DATE_EXCEEDED error when moment is after max moment', () => {
            expect(checkBefore(constraints, tomorow)).toEqual(errorMax)
        })
        test('returns MAX_DATE_EXCEEDED error when moment is the same as max moment', () => {
            expect(checkBefore(constraints, tomorow)).toEqual(errorMax)
        })
        test('returns nothing when inclusive and moment is the same as max moment', () => {
            constraints.beforeInclusive = true
            expect(checkBefore(constraints, now)).toEqual()
        })
        test('returns nothing when moment is before max moment', () => {
            expect(checkBefore(constraints, yesterday)).toEqual()
        })
    })
})

describe('ValidatorDate', () => {

    const datePrev = [2000,0,24]
    const date =     [2000,0,25]
    const dateNext = [2000,0,26]


    test('default constructor call', () => {
        expect(new ValidatorDate()).toBeDefined()
    })

    describe('isAfter', () => {
    
        test('accepts values strictly after', () => {
            const validator = new ValidatorDate().isAfter(date)
            expect(validator.check(dateNext)).toEqual(success)
        })
        test('rejects same value', () => {
            const validator = new ValidatorDate().isAfter(date)
            expect(validator.check(date).state).toEqual('error')
        })
        test('rejects values strictly before', () => {
            const validator = new ValidatorDate().isAfter(date)
            expect(validator.check(datePrev).state).toEqual('error')
        })
    })

    describe('isAfterInclusive', () => {

        test('accepts same value', () => {
            const validator = new ValidatorDate().isAfter(date).isAfterInclusive
            expect(validator.check(date)).toEqual(success)
        })
        test('rejects values strictly before', () => {
            const validator = new ValidatorDate().isAfter(moment()).isAfterInclusive
            expect(validator.check(datePrev).state).toEqual('error')
        })
    })

    describe('isAfterNow', () => {

        test('accepts values in the future', () => {
            const validator = new ValidatorDate().isAfterNow
            expect(validator.check(tomorow)).toEqual(success)
        })
        test('rejects present values', () => {
            const validator = new ValidatorDate().isAfterNow
            expect(validator.check(now).state).toEqual('error')
        })
        test('rejects past values', () => {
            const validator = new ValidatorDate().isAfterNow
            expect(validator.check(yesterday).state).toEqual('error')
        })
    })

    describe('isBefore', () => {

        test('accepts values strictly before', () => {
            const validator = new ValidatorDate().isBefore(date)
            expect(validator.check(datePrev)).toEqual(success)
        })
        test('rejects same value', () => {
            const validator = new ValidatorDate().isBefore(date)
            expect(validator.check(date).state).toEqual('error')
        })
        test('rejects values strictly after', () => {
            const validator = new ValidatorDate().isBefore(date)
            expect(validator.check(dateNext).state).toEqual('error')
        })
    })

    describe('isBeforeInclusive', () => {

        test('accepts same value', () => {
            const validator = new ValidatorDate().isBefore(date).isBeforeInclusive
            expect(validator.check(date)).toEqual(success)
        })
        test('rejects values strictly after', () => {
            const validator = new ValidatorDate().isBefore(date).isBeforeInclusive
            expect(validator.check(dateNext).state).toEqual('error')
        })
    })

    describe('isBeforeNow', () => {

        test('accepts values in the past', () => {
            const validator = new ValidatorDate().isBeforeNow
            expect(validator.check(yesterday)).toEqual(success)
        })
        test('rejects present values', () => {
            const validator = new ValidatorDate().isBeforeNow
            expect(validator.check(now).state).toEqual('error')
        })
        test('rejects future values', () => {
            const validator = new ValidatorDate().isBeforeNow
            expect(validator.check(tomorow).state).toEqual('error')
        })
    })

    describe('check', () => {
        
        test('returns SUCCESS for a fully valid value', () => {
            const validator = new ValidatorDate().isAfter(yesterday).isBefore(tomorow)
            expect(validator.check(now)).toEqual(success)
        })
    })
})