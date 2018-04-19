import { STATES } from './ValidatorBase'
import ValidatorBase from './ValidatorBase'

export const ERRORS = {
    MUST_BE_A_BOOLEAN: 'MUST_BE_AN_OBJECT',
    UNEXPECTED_MEMBERS: 'UNEXPECTED_MEMBERS',
    INVALID_MEMBERS: 'INVALID_MEMBERS'
}

export const checkObject = (constraints, value) => {
    if (typeof value !== 'object' || Array.isArray(value)) {
        return {
            state: STATES.ERROR,
            message: constraints.ERRORS.MUST_BE_AN_OBJECT
        }
    }
}

export const checkShape = (constraints, value) => {
    const shape = constraints.innerShape
    if (shape) {
        // Check the value does not contain unexpected members
        const unwantedKeys = Object.keys(value).filter((k) => {
            if (!shape[k]) {
                return true
            }
        })
        if (unwantedKeys.length) {
            return {
                state: STATES.ERROR,
                message: constraints.ERRORS.UNEXPECTED_MEMBERS
            }
        }
        // Check the value members are valid
        const invalidKeys = Object.keys(shape).reduce((invalid, k) => {
            if (shape[k].check(value[k]).state !== STATES.SUCCESS) {
                return invalid.concat([k])
            }
            return invalid
        }, [])
        if (invalidKeys.length) {
            return {
                state: STATES.ERROR,
                message: constraints.ERRORS.INVALID_MEMBERS
            }
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
            || checkShape(this, value)
    }

    get innerShape() {
        return this._shape
    }
    shape(shape) {
        this._shape = shape
        return this
    }
}