import { STATES } from 'validators/ValidatorBase'
import ValidatorBase from 'validators/ValidatorBase'

export const ERRORS = {
	CANNOT_BE_NULL: 'CANNOT_BE_NULL',
	MUST_BE_A_NUMBER: 'MUST_BE_A_NUMBER',
	MIN_VALUE_EXCEEDED: 'MIN_VALUE_EXCEEDED',
	MAX_VALUE_EXCEEDED: 'MAX_VALUE_EXCEEDED'
}

export const check = (constraints, value) => {
	return checkNil(constraints, value) 
		|| checkNumber(constraints, value)
		|| checkMinValue(constraints, value)
		|| checkMaxValue(constraints, value)
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
		super(Object.assign({}, props, ERRORS))

		this._check = check.bind(this, this)

		this.minValue = props && Number(props.minValue)
		this.maxValue = props && Number(props.maxValue)
		this.allowNil = props && !!props.allowNil
	}
}