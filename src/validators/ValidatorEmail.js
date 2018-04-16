import { STATES } from './ValidatorBase'
import ValidatorBase from './ValidatorBase'

const REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const ERRORS = {
	MUST_BE_A_STRING: 'MUST_BE_A_STRING',
	INVALID_EMAIL: 'INVALID_EMAIL'
}

export const check = (constraints, value) => {
	return checkNil(constraints, value) 
		|| checkString(constraints, value)
		|| checkRegex(constraints, value)
		|| { state: STATES.SUCCESS }
}

export const checkNil = (constraints, value) => {
	if (value === undefined || value == null) {
		return {
			state: STATES.ERROR,
			message: constraints.ERRORS.INVALID_EMAIL
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

export const checkRegex = (constraints, value) => {
	if (!REGEX.test(value)) {
		return {
			state: STATES.ERROR,
			message: constraints.ERRORS.INVALID_EMAIL
		}
	} 
}

export default class ValidatorEmail extends ValidatorBase {

	constructor(props) {
		super(Object.assign({}, props, ERRORS))

		this._check = check.bind(this, this)
	}
}