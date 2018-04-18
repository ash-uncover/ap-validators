import { STATES } from './ValidatorBase'
import ValidatorBase from './ValidatorBase'

export const ERRORS = {
	MUST_BE_A_NUMBER: 'MUST_BE_A_NUMBER',
	MIN_VALUE_EXCEEDED: 'MIN_VALUE_EXCEEDED',
	MAX_VALUE_EXCEEDED: 'MAX_VALUE_EXCEEDED'
}

export const checkNumber = (constraints, value) => {
	if (isNaN(value)) {
		return {
			state: STATES.ERROR,
			message: constraints.ERRORS.MUST_BE_A_NUMBER
		}	
	}
}

export const checkMinValue = (constraints, value) => {
	if (!isNaN(constraints.minValue) && value < constraints.minValue) {
		return {
			state: STATES.ERROR,
			message: constraints.ERRORS.MIN_VALUE_EXCEEDED
		}	
	}
}

export const checkMaxValue = (constraints, value) => {
	if (!isNaN(constraints.maxValue) && value > constraints.maxValue) {
		return {
			state: STATES.ERROR,
			message: constraints.ERRORS.MAX_VALUE_EXCEEDED
		}	
	}
}

export default class ValidatorString extends ValidatorBase {

	constructor(props) {
		super({ errors: ERRORS})
	}

    get maxValue() {
        return this._maxValue
    }
    hasMaxValue(value) {
        this._maxValue = value
        return this
    }

    get minValue() {
        return this._minValue
    }
    hasMinValue(value) {
        this._minValue = value
        return this
    }

    checkErrors(value) {
        return ValidatorBase.prototype.checkErrors.call(this, value)
            || checkNumber(this, value)
            || checkMinValue(this, value)
            || checkMaxValue(this, value)       
    }
}