import stdSuccessHandler from "./stdSuccessHandler";

test('Returns the data oject, a null error message and success: true', ()=>{
    const returnValue = stdSuccessHandler({bananas:3, apples:2})
    expect(returnValue).toEqual({data:{bananas:3, apples:2},error: null, success: true })
})