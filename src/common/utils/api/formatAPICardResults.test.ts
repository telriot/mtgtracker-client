import formatAPICardResults from "./formatAPICardResults"

const testAPIResultItem={
    _id: '11111',
    oracleId:'12345',
    scryfallId: '1234',
    name: 'Wren and Six',
    buyPrice: 2,
    targetPrice:4,
    quantity: 5,
    language: 'EN',
    expansion: 'MH1',
    scryfallPrices:{
        eur: 1,
        usd: 1,
        usdFoil:3,
        eurFoil:3,
        tix: 4
    },
    foil: true,
    image: 'http://www.google.com',
    tcgplayerId: '123'
}

test('Returns a correctly formatted card object', ()=> {
    const formattedCard = formatAPICardResults([testAPIResultItem])
    expect(formattedCard).toEqual([{
        id: '11111',
		minPrice:1,
		medianPrice: 1,
		buyPrice: 2,
		targetPrice: 4,
		quantity: 5,
		set: 'MH1',
		language: 'EN',
		foil: true,
		image:'http://www.google.com',
		cardName:'Wren and Six',
		prices:{
			eur: 1,
			usd: 1,
			usdFoil: 3,
			eurFoil: 3,
			tix: 4
		}
    }])
})