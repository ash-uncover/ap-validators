export const STATES = {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error'
}

export const ERRORS = {
    CANNOT_BE_NULL: 'CANNOT_BE_NULL'
}

export const checkNil = (constraints, value) => {
    if (typeof value === 'undefined' || value === null) {
        if (constraints._allowNil) {
            return {
                state: STATES.SUCCESS
            }
        }
        return {
            state: STATES.ERROR,
            message: constraints.ERRORS.CANNOT_BE_NULL
        }
    }
}

export default class ValidatorBase {

    constructor(props = {}) {
        this._allowNil = true
        this._errors = Object.assign({}, ERRORS, props.errors)
    }

    get isRequired() {
        this._allowNil = false
        return this
    }

    get ERRORS() {
        return this._errors
    }

    check(value) {
        return this.checkErrors(value) || { state: STATES.SUCCESS }
    }

    checkErrors(value) {
        return checkNil(this, value) 
    }
}