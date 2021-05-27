/**
 *
 * @param max max number in range
 * @param min min number in range, defaults to 0
 * @param increment range increment unit, defaults to 1
 * @returns range of integers from min to max by incremental steps
 */
 const getRange = (max: number, min: number = 0, increment: number = 1) => {
	const range: number[] = [];
	for (let i = min; i <= max; i += increment) {
		range.push(i);
	}
	return range;
};

export default getRange