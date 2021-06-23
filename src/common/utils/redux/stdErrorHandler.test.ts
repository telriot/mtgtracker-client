import stdErrorHandler from "./stdErrorHandler";

test('Returns an object with a standard error message and success: false', ()=>{
    const returnValue = stdErrorHandler({err:{message:'something went wrong', status:500}})
    expect(returnValue).toEqual({error: 'Something went wrong with our server', success: false })
})