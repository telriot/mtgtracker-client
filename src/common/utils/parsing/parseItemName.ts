/**
 * 
 * @param item any card item with a name and a set
 * @returns a parsed name/set string
 */
const parseItemName = (item: { cardName: string; set: string }): string =>
	`${item.cardName}${item.set ? ` (${item.set.toUpperCase()})` : ''}`;

export default parseItemName;
