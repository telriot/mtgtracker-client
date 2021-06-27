import { RootState } from 'reducers';

export type ServerSideCard = {
	_id: string;
	oracleId: string;
	scryfallId: string;
	name: string;
	buyPrice: number;
	targetPrice: number;
	quantity: number;
	language: LangVariant;
	expansion: string;
	scryfallPrices: {
		eur: number;
		usd: number;
		eurFoil: number;
		usdFoil: number;
		tix: number;
	};
	foil: boolean;
	image: string;
	owner: string;
	cardCollection: string;
	lastUpdated: string;
	tcgplayerId: string;
};
export type LangVariant =
	| 'EN'
	| 'CN'
	| 'TW'
	| 'FR'
	| 'DE'
	| 'IT'
	| 'JP'
	| 'KO'
	| 'PT'
	| 'RU'
	| 'ES'
	| '';
export type MagicCard = {
	cardName: string;
	//TODO: download list and parse it
	set: string;
	language: LangVariant;
	foil: boolean;
	image: string;
};
export type Prices = {
	usd?: number;
	eur?: number;
	usdFoil?: number;
	eurFoil?: number;
	tix?: number;
};
export type CollectionItem<T> = T & {
	id: string;
	minPrice: number;
	medianPrice: number;
	buyPrice: number;
	targetPrice: number;
	quantity: number;
	prices: Prices;
};

//REDUX STORE TYPES
export type ReducerPayload<T> = { payload: T };
export type ThunkAPIReturnValue = { state: RootState };
export type ThunkReturnValue<T = null> = {
	error: string | null;
	success: boolean;
	data?: T | null;
};
export type AsyncStatus = 'idle' | 'fulfilled' | 'rejected' | 'pending';
export type ActionStatus =
	| 'idle'
	| 'editing'
	| 'creating'
	| 'deleting'
	| 'bulkDeleting';

export interface CollectionSummary {
	maxUsd: number;
	minUsd: number;
	maxEur: number;
	minEur: number;
	totalUsd: number;
	totalEur: number;
	cardsQuantity: number;
	expansions: string[];
	languages: LangVariant[];
	isLoaded?: boolean;
}
export interface CollectionFilters {
	expansion: string;
	language: LangVariant;
	minEur: string;
	maxEur: string;
	minUsd: string;
	maxUsd: string;
	priceGroup: 'scr' | 'tcg';
}
export type FilterKey = Partial<keyof CollectionFilters>;
export interface CollectionState {
	asyncError: string | null;
	asyncStatus: AsyncStatus;
	currentPage: number;
	filters: CollectionFilters;
	collectionSummary: CollectionSummary | null;
	summaryStatus: AsyncStatus;
	pages: number;
	searchBarInput: string;
	selectedCardIds: string[];
	status: ActionStatus;
	targetObject: CollectionItem<MagicCard> | null;
}

export type CardUpdate = {
	id: string;
	foil?: boolean;
} & Partial<Omit<CollectionItem, 'id' | 'minPrice' | 'medianPrice'>>;

export type CardCreationPayload = {
	card: ScryfallCard;
	buyPrice: number;
	targetPrice: number;
	quantity: number;
	isFoil: boolean;
	language: LangVariant;
};
export type SearchFilters = {
	cardName: string;
	expansion: string;
	language: LangVariant;
	minEur: string;
	maxEur: string;
	minUsd: string;
	maxUsd: string;
};

export type SelectOption = { label: string; value: string };

export type ScryfallCard = {
	name: string;
	set: string;
	cardmarket_id: string;
	tcgplayer_id: string;
	oracle_id: string;
	id: string;
	image_uris: {
		large?: string;
		normal?: string;
		small?: string;
	};
	prices:{
		eur:string,
		usd:string,
		usd_foil:string,
		eur_foil:string,
		tix:string,
	}
	set: string;
	set_name: string;
};
