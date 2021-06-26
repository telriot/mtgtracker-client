import React from 'react'
import {fireEvent, render, screen} from 'common/utils/test-utils'
import Card from './MTGItemCard'
import {generateCardMock} from '../../mocks/data'

describe('Renders correctly', () => {
    const card = generateCardMock(1)

    test('Renders correct data', () => {
        render(<Card card={card}/>)
        fireEvent.click(screen.getByLabelText('expand-button'))
        expect (screen.getByText('Name').nextSibling.textContent).toBe(card.cardName)
        expect (screen.getByText('Qty').nextSibling.textContent).toBe(card.quantity.toString())
        expect (screen.getByText('Set').nextSibling.textContent).toBe(card.set)
        expect (screen.getByText('Lang').nextSibling.textContent).toBe(card.language)
        expect (screen.getByText('Foil').nextSibling.textContent).toBe(card.foil?'Yes':'No')
        expect (screen.getByText('Eur').nextSibling.textContent).toBe((card.foil?card.prices.eurFoil:card.prices.eur).toFixed(2))
        expect (screen.getByText('Usd').nextSibling.textContent).toBe((card.foil?card.prices.usdFoil:card.prices.usd).toFixed(2))
        expect (screen.getByText('Buy').nextSibling.textContent).toBe(card.buyPrice.toString())
        expect (screen.getByText('Target').nextSibling.textContent).toBe(card.targetPrice.toString())
    })
    test('Renders N/A on missing price',()=>{
        render(<Card card={{...card, prices:{...card.prices, eur:null, usd:null}}}/>)
        fireEvent.click(screen.getByLabelText('expand-button'))
        expect (screen.getByText('Eur').nextSibling.textContent).toBe('N/A')
        expect (screen.getByText('Usd').nextSibling.textContent).toBe('N/A')
    })
    test('Renders buttons', () => {
        render(<Card card={card}/>)
        fireEvent.click(screen.getByLabelText('expand-button'))
        expect (screen.getByLabelText('edit-button')).toBeInTheDocument
        expect (screen.getByLabelText('delete-button')).toBeInTheDocument
    })
})

// describe('Buttons work correctly', ()=>{
//     const card = generateCardMock(1)
//     test('Edit button opens edit modal', async()=> {
//         render(<Card card={card}/>)
//         fireEvent.click(screen.getByLabelText('expand-button'))
//         async waitFor(()=>fireEvent.click(screen.getByLabelText('edit-button')))
//         screen.debug()

//     })
// })