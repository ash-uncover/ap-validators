import { STATES } from 'validators/ValidatorBase'
import ValidatorBase from 'validators/ValidatorBase'

const MIN_LENGTH = 8
const REQ_LOWER = true
const REQ_UPPER = true
const REQ_SPECIAL = true

const REGEX_FORBIDDEN = /\W/
const REGEX_LOWER = /[a-z]/
const REGEX_UPPER = /[A-Z]/
const REGEX_SPECIAL = /[0-9_]/

export const ERRORS = {
	MUST_BE_A_STRING: 'MUST_BE_A_STRING',
	MIN_LENGTH_EXCEEDED: 'MIN_LENGTH_EXCEEDED',
	CONTAIN_FORBIDDEN_CHARS: 'CONTAIN_FORBIDDEN_CHARS',
	MUST_CONTAIN_LOWERCASE: 'MUST_CONTAIN_LOWERCASE',
	MUST_CONTAIN_UPPERCASE: 'MUST_CONTAIN_UPPERCASE',
	MUST_CONTAIN_SPECIAL: 'MUST_CONTAIN_SPECIAL'
}

export const check = (constraints, value) => {
	return checkString(constraints, value) 
		|| checkLength(constraints, value)
		|| checkCharsAllowed(constraints, value)
		|| checkCharsLower(constraints, value)
		|| checkCharsUpper(constraints, value)
		|| checkCharsSpecial(constraints, value)
		|| { state: STATES.SUCCESS }
}

export const checkString = (constraints, value) => {
	if (typeof value !== 'string') {
		return {
			state: STATES.ERROR,
			message: constraints.ERRORS.MUST_BE_A_STRING
		}	
	}
}

export const checkLength = (constraints, value) => {
	if (value.length < MIN_LENGTH) {
		return {
			state: STATES.ERROR,
			message: constraints.ERRORS.MIN_LENGTH_EXCEEDED
		}	
	}
}

export const checkCharsAllowed = (constraints, value) => {
	if (REGEX_FORBIDDEN.test(value)) {
		return {
			state: STATES.ERROR,
			message: constraints.ERRORS.CONTAIN_FORBIDDEN_CHARS
		}	
	}
}

export const checkCharsLower = (constraints, value) => {
	if (!REGEX_LOWER.test(value)) {
		return {
			state: STATES.ERROR,
			message: constraints.ERRORS.MUST_CONTAIN_LOWERCASE
		}	
	}
}

export const checkCharsUpper = (constraints, value) => {
	if (!REGEX_UPPER.test(value)) {
		return {
			state: STATES.ERROR,
			message: constraints.ERRORS.MUST_CONTAIN_UPPERCASE
		}	
	}
}

export const checkCharsSpecial = (constraints, value) => {
	if (!REGEX_SPECIAL.test(value)) {
		return {
			state: STATES.ERROR,
			message: constraints.ERRORS.MUST_CONTAIN_SPECIAL
		}	
	}
}

export default class ValidatorPassword extends ValidatorBase {

	constructor(props) {
		super(Object.assign({}, props, ERRORS))

		this._check = check.bind(this, this)
	}
}