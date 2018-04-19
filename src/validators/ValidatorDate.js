import { STATES } from './ValidatorBase'
import ValidatorBase from './ValidatorBase'

import moment from 'moment'

export const ERRORS = {
	MUST_BE_A_MOMENT: 'MUST_BE_A_MOMENT',
	MIN_DATE_EXCEEDED: 'MIN_DATE_EXCEEDED',
	MAX_DATE_EXCEEDED: 'MAX_DATE_EXCEEDED'
}

export const checkMoment = (constraints, value) => {
	if (!moment.isMoment(value)) {
		return {
			state: STATES.ERROR,
			message: constraints.ERRORS.MUST_BE_A_MOMENT
		}	
	}
}

export const checkMinDate = (constraints, value) => {
	if (constraints.minDate && value.isBefore(constraints.minDate)) {
		return {
			state: STATES.ERROR,
			message: constraints.ERRORS.MIN_DATE_EXCEEDED
		}	
	}
}

export const checkMaxDate = (constraints, value) => {
	if (constraints.maxDate && value.isAfter(constraints.maxDate)) {
		return {
			state: STATES.ERROR,
			message: constraints.ERRORS.MAX_DATE_EXCEEDED
		}	
	}
}

export default class ValidatorDate extends ValidatorBase {

	constructor(props) {
		super({ errors: ERRORS})
	}

    get maxDate() {
        return this._maxDate
    }
    isBefore(value) {
        this._maxDate = value
        return this
    }

    get minDate() {
        return this._minDate
    }
    isAfter(value) {
        this._minDate = value
        return this
    }

    checkErrors(value) {
        return ValidatorBase.prototype.checkErrors.call(this, value)
            || checkMoment(this, value)
            || checkMinDate(this, value)
            || checkMaxDate(this, value)       
    }
}