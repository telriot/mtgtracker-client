import axios from 'axios';
import mockTimeout from 'common/utils/timers/mockTimeout';
import collection from 'mocks/Collection';
import { CardUpdate, SearchFilters } from 'types';

const MKM_SANDBOX_API = 'https://sandbox.cardmarket.com';
const SCRYFALL_SEARCH_API = 'https://api.scryfall.com/cards/search';

const MOCK_PAGE_SIZE = 10;
const buildFakePaginatedRes = (
	currentPage: number,
	pageSize: number,
	exclude: string[] = [],
	filters?: SearchFilters
) => {

	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = currentPage * pageSize;
	const filteredCollection = collection.filter(card =>{
		if(exclude.includes(card.id)) return false
		if (filters?.cardName) {
			console.log(filters)
			return (
				card.cardName
					.toLowerCase()
					.match(filters.cardName.toLowerCase())
			);
		}
		return true
	})
	const pages = Math.ceil(filteredCollection.length / pageSize);
	const cards = filteredCollection
		.sort((a, b) => a.cardName.localeCompare(b.cardName))
		.slice(startIndex, endIndex);

	return { cards, pages };
};

export const getCollection = async (
	id: string,
	currentPage: number,
	filters?: SearchFilters
): Promise<{ cards: any[]; pages: number }> => {
	try {
		console.log(`fetching collection ${id} at page ${currentPage})`);
		await mockTimeout(500);
		const response = buildFakePaginatedRes(
			currentPage,
			MOCK_PAGE_SIZE,
			[],
			filters
		);
		return response;
	} catch (error) {
		console.error(error);
		throw Error(error);
	}
};
export const patchCollectionItem = async (payload: CardUpdate) => {
	try {
		console.log(
			`editing item ${payload.id} with following changes ${JSON.stringify(
				payload
			)})`
		);
		await mockTimeout(500);
		const response = true;
		return response;
	} catch (error) {
		console.error(error);
		throw Error(error);
	}
};
export const destroyCollectionItem = async (
	id: string,
	currentPage: number
) => {
	try {
		console.log(`deleting item ${id})`);
		await mockTimeout(500);
		const response = buildFakePaginatedRes(currentPage, MOCK_PAGE_SIZE, [
			id
		]);
		return response;
	} catch (error) {
		console.error(error);
		throw Error(error);
	}
};

export const destroyManyCollectionItems = async (
	ids: string[],
	currentPage: number
) => {
	try {
		console.log(`deleting items ${ids.toString()})`);
		await mockTimeout(500);
		const response = buildFakePaginatedRes(
			currentPage,
			MOCK_PAGE_SIZE,
			ids
		);
		return response;
	} catch (error) {
		console.error(error);
		throw Error(error);
	}
};

export const getCardsByNameViaScf = async (
	cardName: string
): Promise<{ [x: string]: any }[]> => {
	try {
		const { data } = await axios.get(`${SCRYFALL_SEARCH_API}`, {
			params: { q: cardName, unique: 'prints' }
		});
		return data.data;
	} catch (error) {
		if (error.response.status === 404) {
			console.warn('Card not found');
			return [];
		} else console.error(error);
	}
};

export const getCardsByNameViaMKM = async (id: string) => {
	try {
		const response = await axios.get(
			`${MKM_SANDBOX_API}/ws/v2.0/products/${id}`
		);
		console.log(response, 'MKM RESPONSE');
		return response;
	} catch (error) {
		console.error(error);
		throw Error(error);
	}
};
