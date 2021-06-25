import { CollectionItem, MagicCard, CollectionSummary } from "types";

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
export const generateCardCollection = (length:number) => {
	const items = new Array(length).fill('card')
	return items.map((_, index)=> generateCardMock(index))
}

const randomInt = (max:number) => Math.floor(Math.random()* max)
const randomBool = () => Math.random() > .5

export const generateServerSideCardMock = (index:number) => ({
	_id: `123${index}`,
    oracleId:`OracleID${index}`,
    scryfallId: `ScryfallID${index}`,
    name: `TestCard${index}`,
    buyPrice: randomInt(100),
    targetPrice: randomInt(100),
    quantity: randomInt(100),
    language: 'EN',
    expansion: `SOM`,
    scryfallPrices:{
		eur: randomInt(10),
		usd: randomInt(10),
		eurFoil: randomInt(50),
		usdFoil: randomInt(50),
		tix: randomInt(20)
	},
    foil: randomBool(),
    image: `https://www.google.com`,
    owner: '12345678',
    cardCollection: '123455667',
    lastUpdated: '10 May 2021',
    tcgplayerId: `TcgId${index}`,
}) 

export const generateServerSideCollection = (length: number) => {
	const items = new Array(length).fill('card')
	return items.map((_, index)=> generateServerSideCardMock(index))
}
export const collectionSummaryMock : CollectionSummary = {
	maxUsd: 500,
	minUsd: 1,
	maxEur: 400,
	minEur: .5,
	totalUsd: 3500,
	totalEur: 2100,
	cardsQuantity: 10,
	expansions: ['SOM', 'MOR', "MH1"],
	languages: ['EN', 'CN']
}