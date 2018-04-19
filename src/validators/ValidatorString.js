import { STATES } from './ValidatorBase'
import ValidatorBase from './ValidatorBase'

export const ERRORS = {
    MUST_BE_A_STRING: 'MUST_BE_A_STRING',
    MIN_LENGTH_EXCEEDED: 'MIN_LENGTH_EXCEEDED',
    MAX_LENGTH_EXCEEDED: 'MAX_LENGTH_EXCEEDED'
}

export const checkString = (constraints, value) => {
    if (typeof value !== 'string') {
        return {
            state: STATES.ERROR,
            message: constraints.ERRORS.MUST_BE_A_STRING
        }   
    }
}

export const checkMinLength = (constraints, value) => {
    if (!isNaN(constraints.minLength) && value.length < constraints.minLength) {
        return {
            state: STATES.ERROR,
            message: constraints.ERRORS.MIN_LENGTH_EXCEEDED
        }   
    }
}

export const checkMaxLength = (constraints, value) => {
    if (!isNaN(constraints.maxLength) && value.length > constraints.maxLength) {
        return {
            state: STATES.ERROR,
            message: constraints.ERRORS.MAX_LENGTH_EXCEEDED
        }   
    }
}

export const checkMatch = (constraints, value) => {
    for (let i = 0; i < constraints.match.length; i++) {
        let match = constraints.match[i]
        if (!match.regex.test(value)) {
            return {
                state: STATES.ERROR,
                message: match.error
            }   
        }
    }
}

export const checkMatchNot = (constraints, value) => {
    for (let i = 0; i < constraints.matchNot.length; i++) {
        let matchNot = constraints.matchNot[i]
        if (matchNot.regex.test(value)) {
            return {
                state: STATES.ERROR,
                message: matchNot.error
            }   
        }
    }
}

export default class ValidatorString extends ValidatorBase {

    constructor(props) {
        super({ errors: ERRORS})
        this._match = []
        this._matchNot = []
    }

    get maxLength() {
        return this._maxLength
    }
    hasMaxLength(value) {
        this._maxLength = value
        return this
    }

    get minLength() {
        return this._minLength
    }
    hasMinLength(value) {
        this._minLength = value
        return this
    }

    get match() {
        return this._match
    }
    matches(regex, error) {
        this._match.push({ regex: regex, error: error })
        return this
    }

    get matchNot() {
        return this._matchNot
    }
    matchesNot(regex, error) {
        this._matchNot.push({ regex: regex, error: error })
        return this
    }

    checkErrors(value) {
        return ValidatorBase.prototype.checkErrors.call(this, value)
            || checkString(this, value)
            || checkMinLength(this, value)
            || checkMaxLength(this, value)       
            || checkMatch(this, value)
            || checkMatchNot(this, value)
    }
}