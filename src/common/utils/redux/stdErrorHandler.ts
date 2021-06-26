/**
 *
 * @param Err The error you want to handle
 * @returns A standard error/success response
 */
const stdErrorHandler = (err:Error): { error: string; success: boolean } => {
	console.error(err);
	return { error: 'Something went wrong with our server', success: false };
};

export default stdErrorHandler;
