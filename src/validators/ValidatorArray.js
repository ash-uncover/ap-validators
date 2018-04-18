import { STATES } from './ValidatorBase'
import ValidatorBase from './ValidatorBase'

export const ERRORS = {
	MUST_BE_AN_ARRAY: 'MUST_BE_AN_ARRAY',
	MIN_LENGTH_EXCEEDED: 'MIN_LENGTH_EXCEEDED',
	MAX_LENGTH_EXCEEDED: 'MAX_LENGTH_EXCEEDED'
}

export const checkArray = (constraints, value) => {
	if (!Array.isArray(value)) {
		return {
			state: STATES.ERROR,
			message: constraints.ERRORS.MUST_BE_AN_ARRAY
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

export default class ValidatorArray extends ValidatorBase {

	constructor(props) {
		super({ errors: ERRORS })
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

    checkErrors(value) {
        return ValidatorBase.prototype.checkErrors.call(this, value)
            || checkArray(this, value)
            || checkMinLength(this, value)
            || checkMaxLength(this, value)       
    }
}