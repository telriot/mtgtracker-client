import getRange from 'common/utils/arrays/getRange'

test('Produces the requested range by increments of one', ()=>{
    const range = getRange(3)
    expect(range).toEqual([0,1,2,3])
})
test('Produces the requested range by increments of the specified number', ()=>{
    const range2 = getRange(3, 0, 2)
    const range4 = getRange(10, 1, 4)
    expect(range2).toEqual([0,2])
    expect(range4).toEqual([1,5,9])

})
test('Returns an empty array if no valid range can be produced', ()=>{
    const rangeEmpty = getRange(3, 4, 2)
    expect(rangeEmpty).toEqual([])
})
// test('Throws an error if no max value is specified', ()=>{
//     const rangeEmpty = getRange()
//     expect(rangeEmpty).toThrowError('Missing max value arg')
// })
