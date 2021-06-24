import React from 'react'
import {fireEvent, render, screen} from 'common/utils/test-utils'
import NumInput from './NumInput'

const TestWrapper = () => {
    const [value, setValue] = React.useState('0')
    return <NumInput value={value} setValue={setValue} id='test-input'/>
}
describe("Input values", () => {
    beforeEach(()=>
    {
        render(<TestWrapper/>)
    })

    test('Renders 0 as a starting input', () => {
        const input = screen.getByLabelText('test-input') as HTMLInputElement
        expect(input.value).toBe('0')
    })
    test('Converts negative input to positive', () => {

        const input = screen.getByLabelText('test-input') as HTMLInputElement
        fireEvent.change(input, {target:{value:'-2'}})
        expect(input.value).toBe('0')
    })
})
