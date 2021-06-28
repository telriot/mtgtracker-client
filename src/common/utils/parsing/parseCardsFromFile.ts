import { BulkCardCreationObject, BulkCardCreationPayload } from "types";

// UTILS
const parseInput = (
	input: string | null | undefined,
	defaultValue: string | null = null,
): string | null => {
	if (!input || !input.trim()) return defaultValue;
	else return input.trim();
};
const parseInputToFloat = (input: string | null | undefined, defaultValue = 0) : number | null => {
	if(!input || isNaN(parseFloat(input.trim()))){
		return defaultValue
	}
	else return parseFloat(input.trim())
}

// MAIN LOGIC
/**
 * 
 * @param text The contents of a txt file
 * @desc the text file lines should be parsed like this: number string, string, string, 'foil' || any, number, number \n
 * @returns An array of card object parsed for bulk card creation
 */
const parseCardsFromFile = (text:string | ArrayBuffer) : BulkCardCreationPayload => text
.toString()
.split('\n')
.map((line) => {
    const [main, expansion, lang, foil, buyPrice, targetPrice] = line.split(',');
    let quantity: number, cardName: string;
    const mainBlock = main.split(' ');
    if (isNaN(parseInt(mainBlock[0]))) {
        quantity = 1;
        cardName = main;
    } else {
        quantity = parseInt(mainBlock[0]);
        cardName = mainBlock.slice(1).join(' ').toString();
    }
    const cardObj = {
        name: parseInput(cardName),
        quantity,
        expansion: parseInput(expansion),
        language: parseInput(lang, 'EN'),
        foil: parseInput(foil) === 'foil',
        buyPrice:parseInputToFloat(buyPrice),
        targetPrice: parseInputToFloat(targetPrice)
    };
    return cardObj;
})
.filter((card) => card.name);

export default parseCardsFromFile