import { CollectionItem, MagicCard } from "types";

export const testMock = '1';
export const generateCardMock = (index:number) : CollectionItem<MagicCard> => ({
	buyPrice: 74,
	cardName: `Test Card ${index}`,
	foil: false,
	id: `60d2a01f2b35469072634983${index}`,
	image: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/9/c/9c3f00af-010d-4485-b8b7-47400d99c496.jpg?1562924091',
	language: 'EN',
	medianPrice: 0.23,
	minPrice: 0.23,
	prices: {
		eur: 0.23,
		eurFoil: 0,
		tix: 0.18,
		usd: 0.23,
		usdFoil: 0
	},

	quantity: 4,
	set: 'ICE',
	targetPrice: 111
});
