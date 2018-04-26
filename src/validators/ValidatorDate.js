import { STATES } from './ValidatorBase'
import ValidatorBase from './ValidatorBase'

import moment from 'moment'

export const ERRORS = {
    MUST_BE_A_DATE: 'MUST_BE_A_DATE',
    MIN_DATE_EXCEEDED: 'MIN_DATE_EXCEEDED',
    MAX_DATE_EXCEEDED: 'MAX_DATE_EXCEEDED'
}

export const checkDate = (constraints, value) => {
    if (!moment.isMoment(value)) {
        return {
            state: STATES.ERROR,
            message: constraints.ERRORS.MUST_BE_A_DATE
        }   
    }
}

export const checkAfter = (constraints, value) => {
    let after = constraints.after
    if (constraints.afterNow) {
        after = moment().startOf('day')
    }
    if (after) {
        if (!constraints.afterInclusive && value.isSame(after)) {
            return {
                state: STATES.ERROR,
                message: constraints.ERRORS.MIN_DATE_EXCEEDED
            }
        }
        if (value.isBefore(after)) {
            return {
                state: STATES.ERROR,
                message: constraints.ERRORS.MIN_DATE_EXCEEDED
            }
        }
    }
}

export const checkBefore = (constraints, value) => {
    let before = constraints.before
    if (constraints.beforeNow) {
        before = moment().startOf('day')
    }
    if (before) {
        if (!constraints.beforeInclusive && value.isSame(before)) {
            return {
                state: STATES.ERROR,
                message: constraints.ERRORS.MAX_DATE_EXCEEDED
            }
        }
        if (value.isAfter(before)) {
            return {
                state: STATES.ERROR,
                message: constraints.ERRORS.MAX_DATE_EXCEEDED
            }
        }
    }
}

export default class ValidatorDate extends ValidatorBase {

    constructor(props) {
        super({ errors: ERRORS})
    }

    get before() {
        return this._isBefore
    }
    isBefore(value) {
        this._isBefore = value
        return this
    }
    get beforeNow() {
        return this._isBeforeNow
    }
    isBeforeNow() {
        this._isBeforeNow = true
        return this
    }
    get beforeInclusive() {
        return this._isBeforeInclusive
    }
    isBeforeInclusive() {
        this._isBeforeInclusive = true
        return this
    }

    get after() {
        return this._isAfter
    }
    isAfter(value) {
        this._isAfter = value
        return this
    }
    isAfterNow() {
        this._isAfterNow = true
        return this
    }
    isAfterInclusive() {
        this._isAfterInclusive = true
        return this
    }

    checkErrors(value) {
        return ValidatorBase.prototype.checkErrors.call(this, value)
            || checkDate(this, value)
            || checkAfter(this, value)
            || checkBefore(this, value)       
    }
}