import ValidatorArray_ from './validators/ValidatorArray'
export const ValidatorArray = ValidatorArray_

import ValidatorBase_ from './validators/ValidatorBase'
export const ValidatorBase = ValidatorBase_

import ValidatorEmail_ from './validators/ValidatorEmail'
export const ValidatorEmail = ValidatorEmail_

import ValidatorMoment_ from './validators/ValidatorMoment'
export const ValidatorMoment = ValidatorMoment_

import ValidatorNonNull_ from './validators/ValidatorNonNull'
export const ValidatorNonNull = ValidatorNonNull_

import ValidatorNumber_ from './validators/ValidatorNumber'
export const ValidatorNumber = ValidatorNumber_

import ValidatorPassword_ from './validators/ValidatorPassword'
export const ValidatorPassword = ValidatorPassword_

import ValidatorPhone_ from './validators/ValidatorPhone'
export const ValidatorPhone = ValidatorPhone_

import ValidatorString_ from './validators/ValidatorString'
export const ValidatorString = ValidatorString_

import { STATES as STATES_ } from './validators/ValidatorBase'
export const STATES = STATES_

import moment from 'moment'

const validators = {
	// Arrays
	nonEmptyArray: new ValidatorArray({ minLength: 1 }),

	// Date
	todayOrBefore: new ValidatorMoment({ maxMoment: moment().startOf('day') }),
	beforeToday: new ValidatorMoment({ maxMoment: moment().startOf('day').subtract(1,'days') }),
	todayOrAfter: new ValidatorMoment({ minMoment: moment().startOf('day') }),
	afterToday: new ValidatorMoment({ minMoment: moment().startOf('day').add(1,'days') }),

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

export default validators