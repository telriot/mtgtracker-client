import axios from 'axios';
import mockTimeout from 'common/utils/timers/mockTimeout';
import { CardCreationPayload, CardUpdate, CollectionItem, MagicCard, SearchFilters } from 'types';
import formatCards from 'common/utils/api/formatAPICardResults';

// CONSTANTS
const SCRYFALL_SEARCH_API = 'https://api.scryfall.com/cards/search';
const SERVER_API = 'http://localhost:5000/api';
export const TEST_COLLECTION_ID = '60bb3e1e2cc9711f847ac195';

// API CALLS
export const getCardsFromCollection = async (
	id: string,
	currentPage: number,
	filters?: SearchFilters
): Promise<{ cards: CollectionItem<MagicCard>[]; pages: number }> => {
	const response = await axios.get(`${SERVER_API}/collections/${id}/cards`, {
		params: {
			page: currentPage,
			cardName: filters.cardName
		}
	});
	const cards = formatCards(response.data.cards.docs);
	return { cards, pages: response.data.cards.totalPages };
};
export const postCollectionItem = async (
	collectionId: string,
	currentPage: number,
	filters: SearchFilters,
	payload: CardCreationPayload
) => {
	const response = await axios.post(
		`${SERVER_API}/collections/${collectionId}/cards`,
		{
			query: {
				page: currentPage,
				cardName: filters.cardName
			},
			payload
		}
	);
	const cards = formatCards(response.data.cards.docs);
	return { cards, pages: response.data.cards.totalPages };
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
};

export const destroyManyCollectionItems = async (
	collectionId: string,
	ids: string[],
	currentPage: number,
	filters?: SearchFilters
): Promise<{ cards: any; pages: number }> => {
	const response = await axios.delete(
		`${SERVER_API}/collections/${collectionId}/bulk/delete`,
		{
			params: {
				page: currentPage,
				cardName: filters.cardName,
				cardIds: ids
			}
		}
	);
	const cards = formatCards(response.data.cards.docs);
	return { cards, pages: response.data.cards.totalPages };
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
