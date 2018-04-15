import { STATES } from 'validators/ValidatorBase'
import ValidatorBase from 'validators/ValidatorBase'

export const ERRORS = {
	CANNOT_BE_NULL: 'CANNOT_BE_NULL'
}

export const check = (constraints, value) => {
	return checkNil(constraints, value) 
		|| { state: STATES.SUCCESS }
}

export const checkNil = (constraints, value) => {
	if (value === undefined || value == null) {
		if (constraints.allowNil) {
			return {
				state: STATES.SUCCESS
			}
		} else {
			return {
				state: STATES.ERROR,
				message: constraints.ERRORS.CANNOT_BE_NULL
			}
		}
	}
}

export default class ValidatorNonNull extends ValidatorBase {

	constructor(props) {
		super(Object.assign({}, props, ERRORS))

		this._check = check.bind(this, this)
		
		this.allowNil = props && !!props.allowNil
	}
}