import axios from 'axios';
import mockTimeout from 'common/utils/timers/mockTimeout'
import collection from 'mocks/Collection'

const SCRYFALL_SEARCH_API = 'https://api.scryfall.com/cards/search';

export const getCollection = async (id:string) => {
	try {
		console.log('fetching collection '+id)
		await mockTimeout(500)
		const response = collection
		return response
	}
	catch(error) {
		console.error(error)
		throw Error(error)
	}
}
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


