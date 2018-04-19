import { STATES } from './ValidatorBase'
import ValidatorBase from './ValidatorBase'

export const ERRORS = {
	MUST_BE_A_BOOLEAN: 'MUST_BE_A_BOOLEAN'
}

export const checkBool = (constraints, value) => {
	if (value !== true && value !== false) {
		return {
			state: STATES.ERROR,
			message: constraints.ERRORS.MUST_BE_A_BOOLEAN
		}	
	}
}

export default class ValidatorBool extends ValidatorBase {

	constructor(props) {
		super({ errors: ERRORS })
	}

    checkErrors(value) {
        return ValidatorBase.prototype.checkErrors.call(this, value)
            || checkBool(this, value)
    }
}