import ValidatorArray_ from './validators/ValidatorArray'
export const ValidatorArray = ValidatorArray_

import ValidatorBase_ from './validators/ValidatorBase'
export const ValidatorBase = ValidatorBase_

import ValidatorBool_ from './validators/ValidatorBool'
export const ValidatorBool = ValidatorBool_

import ValidatorDate_ from './validators/ValidatorDate'
export const ValidatorDate = ValidatorDate_

import ValidatorNumber_ from './validators/ValidatorNumber'
export const ValidatorNumber = ValidatorNumber_

import ValidatorObject_ from './validators/ValidatorObject'
export const ValidatorObject = ValidatorObject_

import ValidatorString_ from './validators/ValidatorString'
export const ValidatorString = ValidatorString_

import { STATES as STATES_ } from './validators/ValidatorBase'
export const STATES = STATES_

import moment from 'moment'

export default class ValidatorTypes {

    static get any() { return new ValidatorBase() }
    static get array() { return new ValidatorArray() }
    static get bool() { return new ValidatorBool() }
    static get date() { return new ValidatorDate() }
    static get number() { return new ValidatorNumber() }
    static get object() { return new ValidatorObject() }
    static get string() { return new ValidatorString() }
}
