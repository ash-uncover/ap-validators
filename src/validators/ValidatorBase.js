export const STATES = {
	INFO: 'info',
	SUCCESS: 'success',
	WARNING: 'warning',
	ERROR: 'error'
}

export default class ValidatorBase {

	check(value) {
		return {
			state: STATES.SUCCESS,
			message: 'success',
			value: value
		}
	}
}