import { RootState } from 'reducers';

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
	| 'ES';
export type MagicCard = {
	cardName: string;
	//TODO: download list and parse it
	set: string;
	language: LangVariant;
	foil: boolean;
	image:string;
};
export type Prices = {
	usd?: number;
	eur?: number;
	usdFoil?: number;
	eurFoil?: number;
	tix?: number;
}
export type CollectionItem<T> = T & {
	id: string;
	minPrice: number;
	medianPrice: number;
	buyPrice: number;
	targetPrice: number;
	quantity: number;
	prices: Prices
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

export interface CollectionState {
	asyncError: string | null;
	asyncStatus: AsyncStatus;
	currentPage: number;
	pages: number;
	searchBarInput: string;
	selectedCardIds: string[];
	status: ActionStatus;
	targetObject: CollectionItem<any> | null;
}

export type CardUpdate = {
	id: string;
	foil?: boolean
} & Partial<Omit<CollectionItem, 'id' | 'minPrice' | 'medianPrice'>>;

export type CardCreationPayload = {
	card: Record<string, any>;
	buyPrice: number;
	targetPrice: number;
	quantity: number;
	isFoil: boolean;
}
export type SearchFilters = {
	cardName: string	
}