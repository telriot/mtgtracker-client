import axios from 'axios';
import mockTimeout from 'common/utils/timers/mockTimeout';
import collection from 'mocks/Collection';
import { CardUpdate, CollectionItem, MagicCard, SearchFilters } from 'types';
import buildRes from 'common/utils/api/buildFakeRes';
import formatCards from 'common/utils/api/formatAPICardResults';

// CONSTANTS
const MKM_SANDBOX_API = 'https://sandbox.cardmarket.com';
const SCRYFALL_SEARCH_API = 'https://api.scryfall.com/cards/search';
const SERVER_API = 'http://localhost:5000/api';
const MOCK_PAGE_SIZE = 10;
export const TEST_COLLECTION_ID = '60bb3e1e2cc9711f847ac195';
const IS_TESTING_LOCAL = false;

// API CALLS
export const getCardsFromCollection = async (
	id: string,
	currentPage: number,
	filters?: SearchFilters
): Promise<{ cards: CollectionItem<MagicCard>[]; pages: number }> => {
	if (IS_TESTING_LOCAL) {
		await mockTimeout(500);
		const response = buildRes(currentPage, MOCK_PAGE_SIZE, [], filters);
		console.log(response, 'MOCK RESPONSE');
		return response;
	} else {
		const response = await axios.get(
			`${SERVER_API}/collections/${id}/cards`,
			{
				params: {
					page: currentPage,
					cardName: filters.cardName
				}
			}
		);
		const cards = formatCards(response.data.cards.docs);
		console.log(cards);
		return { cards, pages: response.data.cards.totalPages };
	}
};

export const patchCollectionItem = async (
	collectionId: string,
	id: string,
	currentPage: number,
	filters: SearchFilters,
	update: CardUpdate
) => {
	const response = await axios.put(
		`${SERVER_API}/collections/${collectionId}/${id}`,
		{
			query: {
				page: currentPage,
				cardName: filters.cardName
			},
			update
		}
	);
	const cards = formatCards(response.data.cards.docs);
	return { cards, pages: response.data.cards.totalPages };
};
export const destroyCollectionItem = async (
	collectionId: string,
	id: string,
	currentPage: number,
	filters?: SearchFilters
) => {
	if (IS_TESTING_LOCAL) {
		await mockTimeout(500);
		const response = buildRes(currentPage, MOCK_PAGE_SIZE, [id], filters);
		return response;
	} else {
		const response = await axios.delete(
			`${SERVER_API}/collections/${collectionId}/${id}`,
			{
				params: {
					page: currentPage,
					cardName: filters.cardName
				}
			}
		);
		const cards = formatCards(response.data.cards.docs);
		return { cards, pages: response.data.cards.totalPages };
	}
};

export const destroyManyCollectionItems = async (
	ids: string[],
	currentPage: number,
	filters?: SearchFilters
) => {
	console.log(`deleting items ${ids.toString()})`);
	await mockTimeout(500);
	const response = buildRes(currentPage, MOCK_PAGE_SIZE, ids, filters);
	return response;
};

// NON-THUNK-HANDLED CALLS
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
