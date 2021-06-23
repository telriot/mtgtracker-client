import parseItemName from 'common/utils/parsing/parseItemName'

test('Parses a card name correctly', ()=>{
    const item = {cardName:'Shivan Dragon', set:'LEB'}
    const parsedName = parseItemName(item)
    expect(parsedName).toBe('Shivan Dragon (LEB)')
})
