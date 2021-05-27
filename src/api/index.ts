import axios from 'axios';

const SCRYFALL_SEARCH_API = 'https://api.scryfall.com/cards/search';

export const getCardsByNameViaScf = async (name: string) : Promise<{[x:string]:any}[]> => {
    console.log('in here')
	try {
		const { data } = await axios.get(`${SCRYFALL_SEARCH_API}`, {
			params: { q: name, unique:'prints' }
		});
        console.log(data)
		return data.data;
	} catch (error) {
		console.error(error);
	}
};
