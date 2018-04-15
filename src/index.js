import ValidatorArraySrc from 'validators/ValidatorArray'
export const ValidatorBase = ValidatorArraySrc

import ValidatorBaseSrc from 'validators/ValidatorBase'
export const ValidatorBase = ValidatorBaseSrc

import ValidatorEmailSrc from 'validators/ValidatorEmail'
export const ValidatorEmail = ValidatorEmailSrc

import ValidatorMomentSrc from 'validators/ValidatorMoment'
export const ValidatorMoment = ValidatorMomentSrc

import ValidatorNonNullSrc from 'validators/ValidatorNonNull'
export const ValidatorNonNull = ValidatorNonNullSrc

import ValidatorNumberSrc from 'validators/ValidatorNumber'
export const ValidatorNumber = ValidatorNumberSrc

import ValidatorPasswordSrc from 'validators/ValidatorPassword'
export const ValidatorPassword = ValidatorPasswordSrc

import ValidatorPhoneSrc from 'validators/ValidatorPhone'
export const ValidatorPhone = ValidatorPhoneSrc

import ValidatorStringSrc from 'validators/ValidatorString'
export const ValidatorString = ValidatorStringSrc

import moment from 'moment'

const today = moment().startOf('day')

export default const validators = {
	// Arrays
	nonEmptyArray: new ValidatorArray({ minLength: 1 }),

	// Date
	beforeToday: new ValidatorMoment({ maxDate: today }),
	afterToday: new ValidatorMoment({ minDate: today }),

	// Numbers
	positiveInteger: new ValidatorNumber({ minValue: 1 }),

	// String
	nonEmptyString: new ValidatorString({ minLength: 1 }),
	tweet: new ValidatorString({ allowNil: false, maxLength: 140 }),

	// Specials
	email: new ValidatorEmail(),
	nonNull: new ValidatorNonNull(),
	password: new ValidatorPassword(),
	phone: new ValidatorPhone()
}
