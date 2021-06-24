import React from 'react'
import {fireEvent, render, screen} from 'common/utils/test-utils'
import SearchBar from './SearchBar'

const TestWrapper = () => {
    const [value, setValue] = React.useState('')
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)  
    return <SearchBar value={value} onChange={handleChange} id='test-input'/>
}

describe('Test input values', ()=>{
    render(<TestWrapper/>)
    const input = screen.getByLabelText('test-input') as HTMLInputElement
    test('Is empty on first render', ()=>{
        expect(input.value).toBe('')
    })
    test('Renders correct text on change', ()=> {
        fireEvent.change(input, {target:{value:'test input'}})
        expect(input.value).toBe('test input')
    })
})