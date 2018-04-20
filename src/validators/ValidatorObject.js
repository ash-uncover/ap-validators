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
        let hasErrors = false
        let error

        // Check the value does not contain unexpected members
        const shapeResult = Object.keys(value).reduce((result, k) => {
            if (!shape[k]) {
                result[k] = {
                    state: STATES.ERROR,
                    message: constraints.ERRORS.UNEXPECTED_MEMBERS
                }
                error = constraints.ERRORS.UNEXPECTED_MEMBERS
            }
            return result
        }, {})

        // Check the value members are valid        
        Object.keys(shape).reduce((result, k) => {
            result[k] = shape[k].check(value[k])
            if (!error && result[k].state !== STATES.SUCCESS) {
                error = constraints.ERRORS.INVALID_MEMBERS
            }
            return result
        }, shapeResult)
        if (error) {
            return {
                state: STATES.ERROR,
                message: error,
                shape: shapeResult
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