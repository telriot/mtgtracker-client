import axios from 'axios';

const SCRYFALL_SEARCH_API = 'https://api.scryfall.com/cards/search';

export const getCardsByNameViaScf = async (name: string) : Promise<{[x:string]:any}[]> => {
	try {
		const { data } = await axios.get(`${SCRYFALL_SEARCH_API}`, {
			params: { q: name, unique:'prints' }
		});
		return data.data;
	} catch (error) {

		if(error.response.status === 404) 
        {
            console.warn('Card not found')
            return []
        }
        else console.error(error)
	}
};
