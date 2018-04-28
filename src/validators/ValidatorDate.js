import { STATES } from './ValidatorBase'
import ValidatorBase from './ValidatorBase'

import moment from 'moment'

export const ERRORS = {
    MUST_BE_A_DATE: 'MUST_BE_A_DATE',
    MIN_DATE_EXCEEDED: 'MIN_DATE_EXCEEDED',
    MAX_DATE_EXCEEDED: 'MAX_DATE_EXCEEDED'
}

export const checkDate = (constraints, value) => {
    const isMoment = moment.isMoment(value)
    const isDate = (value instanceof Date) && moment(value).isValid()
    const isLocalDate = Array.isArray(value) && (value.length = 3) && !isNaN(value[0]) && !isNaN(value[1]) && !isNaN(value[2]) && moment(value).isValid()
    if (!isMoment && !isDate && !isLocalDate) {
        return {
            state: STATES.ERROR,
            message: constraints.ERRORS.MUST_BE_A_DATE
        }       
    }
}

export const castToMoment = (value) => {
    if (moment.isMoment(value)) {
        return value
    }
    return moment(value)
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
    get isBeforeNow() {
        this._isBeforeNow = true
        return this
    }
    get beforeInclusive() {
        return this._isBeforeInclusive
    }
    get isBeforeInclusive() {
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
    get afterNow() {
        return this._isAfterNow
    }
    get isAfterNow() {
        this._isAfterNow = true
        return this
    }
    get afterInclusive() {
        return this._isAfterInclusive
    }
    get isAfterInclusive() {
        this._isAfterInclusive = true
        return this
    }

    checkErrors(value) {
        const errorBase = ValidatorBase.prototype.checkErrors.call(this, value)
            || checkDate(this, value)
        if (errorBase) {
            return errorBase
        } else {
            const momentValue = castToMoment(value)
            return checkAfter(this, momentValue)
                || checkBefore(this, momentValue)
        }
    }
}