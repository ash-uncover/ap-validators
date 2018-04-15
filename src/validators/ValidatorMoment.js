import { STATES } from 'validators/ValidatorBase'
import ValidatorBase from 'validators/ValidatorBase'

import moment from 'moment'

export const ERRORS = {
	CANNOT_BE_NULL: 'CANNOT_BE_NULL',
	MUST_BE_A_MOMENT: 'MUST_BE_A_MOMENT',
	MIN_MOMENT_EXCEEDED: 'MIN_MOMENT_EXCEEDED',
	MAX_MOMENT_EXCEEDED: 'MAX_MOMENT_EXCEEDED'
}

export const check = (constraints, value) => {
	return checkNil(constraints, value) 
		|| checkMoment(constraints, value)
		|| checkMinMoment(constraints, value)
		|| checkMaxMoment(constraints, value)
		|| { state: STATES.SUCCESS }
}

export const checkNil = (constraints, value) => {
	if (value === undefined || value == null) {
		return {
			state: STATES.ERROR,
			message: constraints.ERRORS.CANNOT_BE_NULL
		}
	}
}

export const checkMoment = (constraints, value) => {
	if (!moment.isMoment(value)) {
		return {
			state: STATES.ERROR,
			message: constraints.ERRORS.MUST_BE_A_MOMENT
		}	
	}
}

export const checkMinMoment = (constraints, value) => {
	if (constraints.minMoment && value.isBefore(constraints.minMoment)) {
		return {
			state: STATES.ERROR,
			message: constraints.ERRORS.MIN_MOMENT_EXCEEDED
		}	
	}
}

export const checkMaxMoment = (constraints, value) => {
	if (constraints.maxMoment && value.isAfter(constraints.maxMoment)) {
		return {
			state: STATES.ERROR,
			message: constraints.ERRORS.MAX_MOMENT_EXCEEDED
		}	
	}
}

export default class ValidatorMoment extends ValidatorBase {

	constructor(props) {
		super(Object.assign({}, props, ERRORS))

		this._check = check.bind(this, this)

		this.minMoment = props && props.minMoment && moment(props.minMoment)
		this.maxMoment = props && props.maxMoment && moment(props.maxMoment)
	}
}