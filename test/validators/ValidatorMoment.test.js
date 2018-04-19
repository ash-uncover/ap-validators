import { STATES } from 'validators/ValidatorBase'
import { ERRORS, checkMoment, checkMinDate, checkMaxDate }  from 'validators/ValidatorDate'
import ValidatorDate from 'validators/ValidatorDate'

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

describe('ValidatorDate exports', () => {

    beforeEach(() => {
        constraints = { ERRORS: ERRORS }
    })

    describe('checkMoment', () => {
        
        const error = {
            state: STATES.ERROR,
            message: ERRORS.MUST_BE_A_MOMENT
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

    describe('checkMinDate', () => {

        const error = {
            state: STATES.ERROR,
            message: constraints.ERRORS.MIN_DATE_EXCEEDED
        }

        beforeEach(() => {
            constraints.minDate = now
        })
        
        test('returns MIN_DATE_EXCEEDED error when moment is before min moment', () => {
            expect(checkMinDate(constraints, yesterday)).toEqual(error)
        })
        test('returns nothing when moment is the same as min moment', () => {
            expect(checkMinDate(constraints, now)).toEqual()
        })
        test('returns nothing when moment is the after min moment', () => {
            expect(checkMinDate(constraints, tomorow)).toEqual()
        })
    })

    describe('checkMaxDate', () => {

        const error = {
            state: STATES.ERROR,
            message: constraints.ERRORS.MAX_DATE_EXCEEDED
        }

        beforeEach(() => {
            constraints.maxDate = now
        })
        
        test('returns MAX_DATE_EXCEEDED error when moment is after max moment', () => {
            expect(checkMaxDate(constraints, tomorow)).toEqual(error)
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