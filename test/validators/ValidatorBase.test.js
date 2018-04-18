import ValidatorBase from 'validators/ValidatorBase'
import { STATES, ERRORS, checkNil } from 'validators/ValidatorBase'

/* TEST DATA */

let constraints = { 
    ERRORS: ERRORS 
}

const success = {
    state: STATES.SUCCESS
}

/* TEST CASES */

describe('ValidatorBase exports', () => {
    describe('STATES', () => {
    	
    	test('has a "success" entry', () => {
    		expect(STATES.SUCCESS).toEqual("success")
    	})
    	test('has a "info" entry', () => {
    		expect(STATES.INFO).toEqual("info")
    	})
    	test('has a "warning" entry', () => {
    		expect(STATES.WARNING).toEqual("warning")
    	})
    	test('has a "info" entry', () => {
    		expect(STATES.ERROR).toEqual("error")
    	})
    })

    describe('checkNil', () => {

        describe('when validator does not allow nil values', () => {

            const error = {
                state: STATES.ERROR,
                message: ERRORS.CANNOT_BE_NULL
            }

            test('returns CANNOT_BE_NULL error for undefined value', () => {
                expect(checkNil(constraints, undefined)).toEqual(error)
            })
            test('returns CANNOT_BE_NULL error for null value', () => {
                expect(checkNil(constraints, null)).toEqual(error)
            })
            test('returns nothing for defined value', () => {
                expect(checkNil(constraints, [])).toEqual()
            })
        })

        describe('when validator allows nil values', () => {

            beforeEach(() => {
                constraints._allowNil = true
            })

            test('returns SUCCESS for undefined value', () => {
                expect(checkNil(constraints, undefined)).toEqual(success)
            })
            test('returns SUCCESS for null value', () => {
                expect(checkNil(constraints, null)).toEqual(success)
            })
            test('returns nothing for defined value', () => {
                expect(checkNil(constraints, [])).toEqual()
            })
        })
    })
})

describe('ValidatorBase', () => {

	describe('default constructor call', () => {
		expect(new ValidatorBase()).toBeDefined()
	})

	describe('ERRORS', () => {

		test('returns default object when unset', () => {
			const validator = new ValidatorBase()
			
			expect(validator.ERRORS).toEqual(ERRORS)
		})

		test('can be set through constructor', () => {
			const error = { error: 'error' }
			const validator = new ValidatorBase({ errors: error })
			
			expect(validator.ERRORS).toEqual(Object.assign(error , ERRORS))
		})
	})

	describe('check', () => {

		test('returns success for any value when nothing specified', () => {
			const validator = new ValidatorBase()
			
			expect(validator.check('')).toEqual(success)
		})

        test('returns success for null values when isRequired was not called', () => {
            const value = 'value'
            const validator = new ValidatorBase()
            
            expect(validator.check(null)).toEqual(success)
        })

        test('returns error for null values when isRequired was called', () => {
            const value = 'value'
            const validator = new ValidatorBase().isRequired
            
            expect(validator.check(null)).toEqual({
                state: STATES.ERROR,
                message: ERRORS.CANNOT_BE_NULL
            })
        })
	})
})