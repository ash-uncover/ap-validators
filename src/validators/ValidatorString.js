import { STATES } from './ValidatorBase'
import ValidatorBase from './ValidatorBase'

export const ERRORS = {
	CANNOT_BE_NULL: 'CANNOT_BE_NULL',
	MUST_BE_A_STRING: 'MUST_BE_A_STRING',
	MIN_LENGTH_EXCEEDED: 'MIN_LENGTH_EXCEEDED',
	MAX_LENGTH_EXCEEDED: 'MAX_LENGTH_EXCEEDED'
}

export const check = (constraints, value) => {
	return checkNil(constraints, value) 
		|| checkString(constraints, value)
		|| checkMinLength(constraints, value)
		|| checkMaxLength(constraints, value)
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

export default class ValidatorString extends ValidatorBase {

	constructor(props) {
		super(Object.assign({}, props, ERRORS))

		this._check = check.bind(this, this)

		this.minLength = props && Number(props.minLength)
		this.maxLength = props && Number(props.maxLength)
		this.allowNil = props && !!props.allowNil
	}
}