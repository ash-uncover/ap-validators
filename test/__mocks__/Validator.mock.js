import { STATES } from 'validators/ValidatorBase'

export default class ValidatorMock {

    constructor(output) {
        this.check = jest.fn()
        if (output) {
            this.check.mockReturnValue(output)
        } else {
            this.check.mockReturnValue({ state: STATES.SUCCESS })
        }
    }
}