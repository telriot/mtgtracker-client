import React from 'react'
import {fireEvent, render, screen} from 'common/utils/test-utils'
import Pagination from './Pagination'

const TestWrapper = ({pages=5, maxButtons=3, startingPage=1}:{pages?:number, maxButtons?:number, startingPage?:number}) => {
    const [activePage, setActivePage] = React.useState(startingPage)
    return <Pagination pages={pages} activePage={activePage} setPage={setActivePage} maxButtons={maxButtons}/>
}
describe("Input values", () => {

    test('Shows active page if page is 1', () => {
        render(<TestWrapper/>)
        expect(screen.getByText('1')).toBeInTheDocument
    })
    test('Shows active contiguous pages if page is above 1', () => {
        render(<TestWrapper/>)
        fireEvent.click(screen.getByText('2'))
        expect(screen.getByText('3')).toBeInTheDocument
        expect(screen.getByText('1')).toBeInTheDocument
    })
    test('Shows first and last page', () => {
        render(<TestWrapper pages={14}/>)
        fireEvent.click(screen.getByText('2'))
        expect(screen.getByText('1')).toBeInTheDocument
        expect(screen.getByText('14')).toBeInTheDocument
    })
    test('Shows ellipsis if necessary', () => {
        render(<TestWrapper pages={14}/>)
        expect(screen.getByText('...')).toBeInTheDocument
    })
    test('Moves to previous page on left chevron click', ()=>{
        render(<TestWrapper pages={14} startingPage={6}/>)
        fireEvent.click(screen.getByLabelText('pagination-prev-button'))
        expect(screen.getByText('4')).toBeInTheDocument
    })
    test('Moves to next page on right chevron click', ()=>{
        render(<TestWrapper pages={14} startingPage={6}/>)
        fireEvent.click(screen.getByLabelText('pagination-next-button'))
        expect(screen.getByText('8')).toBeInTheDocument
    })
    test('Does not show left chevron on first page', () => {
        render(<TestWrapper/>)
        expect(screen.findByLabelText('pagination-prev-button')).not.toBeInTheDocument
    })
    test('Does not show right chevron on last page', () => {
        render(<TestWrapper pages={4} startingPage={4}/>)
        expect(screen.findByLabelText('pagination-next-button')).not.toBeInTheDocument
    })
})
