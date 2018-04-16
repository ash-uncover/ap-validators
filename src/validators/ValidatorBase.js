export const STATES = {
	INFO: 'info',
	SUCCESS: 'success',
	WARNING: 'warning',
	ERROR: 'error'
}

export const check = (value) => ({
	state: STATES.SUCCESS
})

export default class ValidatorBase {

	constructor(props = {}) {
		this._errors = props.errors || {}
		this._check = props.check || check
	}

	get ERRORS() {
		return this._errors
	}

	check(value) {
		return this._check(value)
	}
}