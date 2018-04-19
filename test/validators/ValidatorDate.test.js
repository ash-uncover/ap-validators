import { STATES } from 'validators/ValidatorBase'
import { ERRORS, checkDate, checkMinDate, checkMaxDate }  from 'validators/ValidatorDate'
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

const yesterday = moment().subtract(1, 'days')
const now = moment()
const tomorow = moment().add(1, 'days')

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

    describe('checkMinDate', () => {

        beforeEach(() => {
            constraints.minDate = now
        })
        
        test('returns MIN_DATE_EXCEEDED error when moment is before min date', () => {
            expect(checkMinDate(constraints, yesterday)).toEqual(errorMin)
        })
        test('returns nothing when moment is the same as min date', () => {
            expect(checkMinDate(constraints, now)).toEqual()
        })
        test('returns nothing when moment is the after min date', () => {
            expect(checkMinDate(constraints, tomorow)).toEqual()
        })
    })

    describe('checkMaxDate', () => {

        beforeEach(() => {
            constraints.maxDate = now
        })
        
        test('returns MAX_DATE_EXCEEDED error when moment is after max moment', () => {
            expect(checkMaxDate(constraints, tomorow)).toEqual(errorMax)
        })
        test('returns nothing when moment is the same as max moment', () => {
            expect(checkMaxDate(constraints, now)).toEqual()
        })
        test('returns nothing when moment is before max moment', () => {
            expect(checkMaxDate(constraints, yesterday)).toEqual()
        })
    })
})

describe('ValidatorDate', () => {

    test('default constructor call', () => {
        expect(new ValidatorDate()).toBeDefined()
    })


    describe('isAfter', () => {
    
        test('with non date minMoment', () => {
            const validator = new ValidatorDate().isAfter('')
            expect(validator.check(moment().add(1,'days'))).toEqual(success)
        })
    })

    describe('isBefore', () => {

        describe('with non moment maxMoment', () => {
            const validator = new ValidatorDate().isBefore({})
            expect(validator.check(moment().subtract(1,'days'))).toEqual(success)
        })
    })

    describe('check', () => {
        
        test('returns SUCCESS for a fully valid value', () => {
            const validator = new ValidatorDate().isAfter(yesterday).isBefore(tomorow)
            expect(validator.check(now)).toEqual(success)
        })
    })
})