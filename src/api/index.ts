import axios from 'axios';
import mockTimeout from 'common/utils/timers/mockTimeout'
import collection from 'mocks/Collection'
import { CardUpdate } from 'types';

const SCRYFALL_SEARCH_API = 'https://api.scryfall.com/cards/search';

export const getCollection = async (id:string, currentPage:number) : Promise<{cards:any[], pages:number}>=> {
	try {
		console.log(`fetching collection ${id} at page ${currentPage})`)
		await mockTimeout(500)
		const response = {cards:collection, pages:10}
		return response
	}
	catch(error) {
		console.error(error)
		throw Error(error)
	}
}
export const patchCollectionItem = async (payload:CardUpdate) => {
	
	try {
		console.log(`editing item ${payload.id} with following changes ${JSON.stringify(payload)})`)
		await mockTimeout(500)
		const response = true
		return response
	}
	catch(error) {
		console.error(error)
		throw Error(error)
	}
}
export const destroyCollectionItem = async (id:string) => {
	
	try {
		console.log(`deleting item ${id})`)
		await mockTimeout(500)
		const response = true
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


