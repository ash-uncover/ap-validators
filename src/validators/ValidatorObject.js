import { STATES } from './ValidatorBase'
import ValidatorBase from './ValidatorBase'

export const ERRORS = {
    MUST_BE_A_BOOLEAN: 'MUST_BE_AN_OBJECT'
}

export const checkObject = (constraints, value) => {
    if (typeof value !== 'object' || Array.isArray(value)) {
        return {
            state: STATES.ERROR,
            message: constraints.ERRORS.MUST_BE_AN_OBJECT
        }   
    }
}

export default class ValidatorBool extends ValidatorBase {

    constructor(props) {
        super({ errors: ERRORS })
    }

    checkErrors(value) {
        return ValidatorBase.prototype.checkErrors.call(this, value)
            || checkObject(this, value)
    }
}