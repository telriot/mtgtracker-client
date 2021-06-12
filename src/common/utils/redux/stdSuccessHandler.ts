import { ThunkReturnValue } from "types";

/**
 * 
 * @param data The data to return in the ThunkReturnValue
 * @returns A standard 'data/error null/success' response
 */
 const stdSuccessHandler = <T extends unknown>(data: T) : ThunkReturnValue<T> => 
 {
     return { data, error: null, success: true };
 }
 
 export default stdSuccessHandler