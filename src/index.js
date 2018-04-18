import ValidatorArray_ from './validators/ValidatorArray'
export const ValidatorArray = ValidatorArray_

import ValidatorBase_ from './validators/ValidatorBase'
export const ValidatorBase = ValidatorBase_

import ValidatorMoment_ from './validators/ValidatorMoment'
export const ValidatorMoment = ValidatorMoment_

import ValidatorNumber_ from './validators/ValidatorNumber'
export const ValidatorNumber = ValidatorNumber_

import ValidatorString_ from './validators/ValidatorString'
export const ValidatorString = ValidatorString_

import { STATES as STATES_ } from './validators/ValidatorBase'
export const STATES = STATES_

import moment from 'moment'

const validators = {
	// Arrays
	nonEmptyArray: new ValidatorArray()
        .hasMinLength(1),

	// Date
	todayOrBefore: new ValidatorMoment().
        isBefore(moment().startOf('day').add(1,'days')),
	beforeToday: new ValidatorMoment()
        .isBefore(moment().startOf('day')),
	todayOrAfter: new ValidatorMoment()
        .isAfter(moment().startOf('day')),
	afterToday: new ValidatorMoment()
        .isAfter(moment().startOf('day').add(1,'days')),

	// Numbers
	positiveInteger: new ValidatorNumber().hasMinValue(1),

	// String
	nonEmptyString: new ValidatorString().hasMinLength(1),
	tweet: new ValidatorString().isRequired.hasMaxLength(140),

	// Specials
	nonNull: new ValidatorBase().isRequired,
	email: new ValidatorString()
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'INVALID_EMAIL'),
    password: new ValidatorString()
        .hasMinLength(8)
        .matchesNot(/\W/, 'CONTAIN_FORBIDDEN_CHARS')
        .matches(/[a-z]/, 'MUST_CONTAIN_LOWERCASE')
        .matches(/[A-Z]/, 'MUST_CONTAIN_UPPERCASE')
        .matches(/[0-9_]/, 'MUST_CONTAIN_SPECIAL'),
    phone: new ValidatorString()
        .matches(/^0[1-9]([-. ]?[0-9]{2}){4}$/, 'INVALID_PHONE'),
}

export default validators

const ValidatorTypes = {

    any: new ValidatorBase(),
    array: new ValidatorArray(),
    number: new ValidatorNumber(),
    string: new ValidatorString()
}
