import axios from 'axios';
// import mockTimeout from 'common/utils/timers/mockTimeout';
import {
	CardCreationPayload,
	CardUpdate,
	CollectionSummary,
	CollectionItem,
	MagicCard,
	SearchFilters,
	ScryfallCard,
	BulkCardCreationPayload
} from 'types';
import formatCards from 'common/utils/api/formatAPICardResults';

// CONSTANTS
const SCRYFALL_SEARCH_API = 'https://api.scryfall.com/cards/search';
export const SERVER_API = 'http://localhost:5000/api';
export const TEST_COLLECTION_ID = '60d0559479086231e711cd19';

export interface CardDataReturnValue {
	cards: CollectionItem<MagicCard>[];
	pages: number;
}
export interface CardDataReturnValueWithSummary extends CardDataReturnValue {
	collectionSummary: CollectionSummary;
}
// API CALLS
export const getCardsFromCollection = async (
	id: string,
	currentPage: number,
	filters?: SearchFilters
): Promise<{ cards: CollectionItem<MagicCard>[]; pages: number }> => {
	const response = await axios.get(`${SERVER_API}/collections/${id}/cards`, {
		params: {
			page: currentPage,
			...filters
		}
	});
	const cards = formatCards(response.data.cards.docs);
	return { cards, pages: response.data.cards.totalPages };
};
export const getCollectionSummary = async (
	id: string
): Promise<{ collectionSummary: CollectionSummary }> => {
	const response = await axios.get(`${SERVER_API}/collections/${id}/summary`);
	return { collectionSummary: response.data.summary };
};
export const postCollectionItem = async (
	collectionId: string,
	currentPage: number,
	filters: SearchFilters,
	payload: CardCreationPayload
): Promise<CardDataReturnValue> => {
	const response = await axios.post(
		`${SERVER_API}/collections/${collectionId}/cards`,
		{
			query: {
				page: currentPage,
				...filters
			},
			payload
		}
	);
	const cards = formatCards(response.data.cards.docs);
	return { cards, pages: response.data.cards.totalPages };
};
export const postBulkCards = async (
	collectionId: string,
	currentPage: number,
	filters: SearchFilters,
	payload: BulkCardCreationPayload
): Promise<CardDataReturnValueWithSummary> => {
	const response = await axios.post(
		`${SERVER_API}/collections/${collectionId}/bulk`,
		{
			query: {
				page: currentPage,
				...filters
			},
			cards: payload
		}
	);
	const cards = formatCards(response.data.cards.docs);
	return {
		cards,
		pages: response.data.cards.totalPages,
		collectionSummary: response.data.summary
	};
};

export const patchCollectionItem = async (
	collectionId: string,
	id: string,
	currentPage: number,
	filters: SearchFilters,
	update: CardUpdate
): Promise<CardDataReturnValue> => {
	const response = await axios.put(
		`${SERVER_API}/collections/${collectionId}/${id}`,
		{
			query: {
				page: currentPage,
				...filters
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
): Promise<CardDataReturnValue> => {
	const response = await axios.delete(
		`${SERVER_API}/collections/${collectionId}/${id}`,
		{
			params: {
				page: currentPage,
				...filters
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
): Promise<CardDataReturnValue> => {
	const response = await axios.delete(
		`${SERVER_API}/collections/${collectionId}/bulk/delete`,
		{
			params: {
				page: currentPage,
				cardIds: ids,
				...filters
			}
		}
	);
	const cards = formatCards(response.data.cards.docs);
	return { cards, pages: response.data.cards.totalPages };
};

// NON-THUNK-HANDLED CALLS
export const getCardsByNameViaScf = async (
	cardName: string
): Promise<ScryfallCard[]> => {
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
