//  ======================================== IMPORTS
import {
	isAnyOf,
	createSlice,
	createAsyncThunk,
	createEntityAdapter
} from '@reduxjs/toolkit';
import { RootState } from 'reducers';
import {
	ActionStatus,
	CardCreationPayload,
	FilterKey,
	CollectionSummary,
	CollectionItem,
	CollectionState,
	MagicCard,
	ReducerPayload,
	AsyncStatus,
	SearchFilters,
	Prices,
	BulkCardCreationPayload
} from 'types';
import { CardUpdate, ThunkReturnValue, ThunkAPIReturnValue } from 'types';
import {
	getCardsFromCollection,
	getCollectionSummary,
	destroyCollectionItem,
	patchCollectionItem,
	postCollectionItem,
	postManyCardsFromList,
	destroyManyCollectionItems,
	TEST_COLLECTION_ID
} from 'api';
import stdErrorHandler from 'common/utils/redux/stdErrorHandler';
import stdSuccessHandler from 'common/utils/redux/stdSuccessHandler';

//  ======================================== UTILS
const getPrice = (prices: Prices, key: 'usd' | 'eur', isFoil: boolean) => {
	const price = parseFloat(prices[`${key}${isFoil ? 'Foil' : ''}`]);
	return isNaN(price) ? 0 : price;
};
//  ======================================== ENTITIES
export const collectionAdapter = createEntityAdapter<CollectionItem<MagicCard>>(
	{
		selectId: (card) => card.id,
		sortComparer: (a, b) => a.cardName.localeCompare(b.cardName || '')
	}
);
//  ======================================== THUNKS
export const fetchCollection = createAsyncThunk<
	ThunkReturnValue<{ cards: CollectionItem<MagicCard>[]; pages: number }>,
	{ id: string },
	ThunkAPIReturnValue
>('collection/fetchCollection', async ({ id }, thunkAPI) => {
	const { currentPage, searchBarInput, filters } =
		thunkAPI.getState().collection;
	try {
		const { cards, pages } = await getCardsFromCollection(
			TEST_COLLECTION_ID || id,
			currentPage,
			{ cardName: searchBarInput, ...filters }
		);
		return stdSuccessHandler({ cards, pages });
	} catch (error) {
		return stdErrorHandler(error);
	}
});
export const fetchCollectionSummary = createAsyncThunk<
	ThunkReturnValue<{ collectionSummary: CollectionSummary }>,
	void,
	ThunkAPIReturnValue
>('collection/fetchCollectionSummary', async () => {
	try {
		const { collectionSummary } = await getCollectionSummary(
			TEST_COLLECTION_ID
		);
		return stdSuccessHandler({ collectionSummary });
	} catch (error) {
		return stdErrorHandler(error);
	}
});
export const addCollectionItem = createAsyncThunk<
	ThunkReturnValue<{
		cards: CollectionItem<MagicCard>[];
		pages: number;
		update: CardCreationPayload;
	}>,
	CardCreationPayload,
	ThunkAPIReturnValue
>('collection/addCollectionItem', async (payload, thunkAPI) => {
	try {
		const { currentPage, searchBarInput, filters } =
			thunkAPI.getState().collection;
		const { cards, pages } = await postCollectionItem(
			TEST_COLLECTION_ID,
			currentPage,
			{ cardName: searchBarInput, ...filters },
			payload
		);
		return stdSuccessHandler({ cards, pages, update: payload });
	} catch (error) {
		return stdErrorHandler(error);
	}
});

export const bulkAddCollectionItems = createAsyncThunk<
	ThunkReturnValue<{
		cards: CollectionItem<MagicCard>[];
		pages: number;
		collectionSummary: CollectionSummary;
	}>,
	BulkCardCreationPayload,
	ThunkAPIReturnValue
>('collection/bulkAddCollectionItems', async (payload, thunkAPI) => {
	try {
		const { currentPage, searchBarInput, filters } =
			thunkAPI.getState().collection;
		const { cards, pages, collectionSummary } = await postManyCardsFromList(
			TEST_COLLECTION_ID,
			currentPage,
			{ cardName: searchBarInput, ...filters },
			payload
		);
		return stdSuccessHandler({ cards, pages, collectionSummary });
	} catch (error) {
		return stdErrorHandler(error);
	}
});
export const updateCollectionItem = createAsyncThunk<
	ThunkReturnValue<{
		cards: CollectionItem<MagicCard>[];
		pages: number;
		update: CardUpdate;
		target: CollectionItem<MagicCard>;
	}>,
	CardUpdate,
	ThunkAPIReturnValue
>('collection/updateCollectionItem', async (payload, thunkAPI) => {
	try {
		const { currentPage, searchBarInput, targetObject, filters } =
			thunkAPI.getState().collection;
		const { cards, pages } = await patchCollectionItem(
			TEST_COLLECTION_ID,
			payload.id,
			currentPage,
			{ cardName: searchBarInput, ...filters },
			payload
		);
		return stdSuccessHandler({
			cards,
			pages,
			update: payload,
			target: targetObject
		});
	} catch (error) {
		return stdErrorHandler(error);
	}
});

export const deleteCollectionItem = createAsyncThunk<
	ThunkReturnValue<{
		id: string;
		cards: CollectionItem<MagicCard>[];
		pages: number;
		target: CollectionItem<MagicCard>;
	}>,
	null,
	ThunkAPIReturnValue
>('collection/deleteCollectionItem', async (_, thunkAPI) => {
	try {
		const { targetObject, currentPage, searchBarInput, filters } =
			thunkAPI.getState().collection;
		const { cards, pages } = await destroyCollectionItem(
			TEST_COLLECTION_ID,
			targetObject.id,
			currentPage,
			{ cardName: searchBarInput, ...filters }
		);
		return stdSuccessHandler({
			id: targetObject.id,
			cards,
			pages,
			target: targetObject
		});
	} catch (error) {
		return stdErrorHandler(error);
	}
});
export const bulkDeleteCollectionItems = createAsyncThunk<
	ThunkReturnValue<{
		ids: string[];
		cards: CollectionItem<MagicCard>[];
		pages: number;
		targets: CollectionItem<MagicCard>[];
	}>,
	null,
	ThunkAPIReturnValue
>('collection/bulkDeleteCollectionItems', async (_, thunkAPI) => {
	try {
		const {
			selectedCardIds,
			currentPage,
			searchBarInput,
			entities,
			filters
		} = thunkAPI.getState().collection;
		const targetObjects = selectedCardIds.map((id) => entities[id]);
		const { cards, pages } = await destroyManyCollectionItems(
			TEST_COLLECTION_ID,
			selectedCardIds,
			currentPage,
			{ cardName: searchBarInput, ...filters }
		);
		return stdSuccessHandler({
			ids: selectedCardIds,
			cards,
			pages,
			targets: targetObjects
		});
	} catch (error) {
		return stdErrorHandler(error);
	}
});
//  ======================================== INITIAL STATE

const initialState = collectionAdapter.getInitialState({
	currentPage: 1,
	collectionSummary: {
		maxUsd: 0,
		minUsd: 0,
		maxEur: 0,
		minEur: 0,
		totalUsd: 0,
		totalEur: 0,
		cardsQuantity: 0,
		expansions: [],
		languages: [],
		isLoaded: false
	},
	summaryStatus: 'idle',
	status: 'idle',
	asyncError: null,
	asyncStatus: 'idle',
	pages: 0,
	searchBarInput: '',
	filters: {
		expansion: '',
		language: '',
		minEur: '0',
		maxEur: '0',
		minUsd: '0',
		maxUsd: '0',
		priceGroup: 'scr'
	},
	selectedCardIds: [],
	targetObject: null
} as CollectionState);

//  ======================================== SLICES
const collection = createSlice({
	name: 'collection',
	initialState,
	reducers: {
		cardSelected: (state, { payload }: ReducerPayload<string>) => {
			state.selectedCardIds = [payload];
		},
		cardMultiSelected: (state, { payload }: ReducerPayload<string>) => {
			state.selectedCardIds.push(payload);
		},
		cardDeselected: (state, { payload }: ReducerPayload<string>) => {
			state.selectedCardIds = state.selectedCardIds.filter(
				(id) => id !== payload
			);
		},
		currentPageSet: (state, { payload }: ReducerPayload<number>) => {
			state.currentPage = payload;
		},
		filterSet: (
			state,
			{ payload }: ReducerPayload<{ filter: FilterKey; value: string }>
		) => {
			state.filters[payload.filter as string] = payload.value;
		},
		filtersReset: (state) => {
			state.filters = {
				expansion: '',
				language: '',
				minEur: state.collectionSummary.minEur.toString(),
				maxEur: state.collectionSummary.maxEur.toString(),
				minUsd: state.collectionSummary.minUsd.toString(),
				maxUsd: state.collectionSummary.maxUsd.toString(),
				priceGroup: 'scr'
			};
		},
		pagesSet: (state, { payload }: ReducerPayload<number>) => {
			state.pages = payload;
		},
		searchBarInputChanged: (state, { payload }: ReducerPayload<string>) => {
			state.searchBarInput = payload;
		},
		statusSet: (
			state,
			{
				payload
			}: ReducerPayload<{
				status: ActionStatus;
				target?: CollectionItem<MagicCard> | null;
			}>
		) => {
			state.status = payload.status;
			state.targetObject = payload.target || null;
		}
	},

	extraReducers: (builder) => {
		// FETCH COLLECTION
		builder.addCase(
			fetchCollection.fulfilled,
			(state, { payload: { data, error, success } }) => {
				if (success && data) {
					state.asyncStatus = 'fulfilled';
					state.pages = data.pages;
					collectionAdapter.setAll(state, data.cards);
				} else {
					state.asyncStatus = 'rejected';
					state.asyncError = error;
				}
			}
		);
		// FETCH COLLECTION SUMMARY
		builder.addCase(
			fetchCollectionSummary.fulfilled,
			(state, { payload: { data, error, success } }) => {
				if (success && data) {
					state.collectionSummary = {
						...data.collectionSummary,
						isLoaded: true
					};
					state.summaryStatus = 'fulfilled';
					state.filters.minUsd =
						data.collectionSummary.minUsd.toString();
					state.filters.minEur =
						data.collectionSummary.minEur.toString();
					state.filters.maxUsd =
						data.collectionSummary.maxUsd.toString();
					state.filters.maxEur =
						data.collectionSummary.maxEur.toString();
				} else {
					state.asyncError = error;
					state.summaryStatus = 'rejected';
				}
			}
		);
		builder.addCase(fetchCollectionSummary.pending, (state) => {
			state.summaryStatus = 'pending';
		});
		builder.addCase(fetchCollectionSummary.rejected, (state) => {
			state.summaryStatus = 'rejected';
		});
		// CREATE ITEM
		builder.addCase(
			addCollectionItem.fulfilled,
			({ collectionSummary }, { payload: { data, success } }) => {
				if (success) {
					const { update } = data;
					const { quantity } = update;
					const { eur, eur_foil, usd, usd_foil, tix } =
						update.card.prices;
					const priceObj = {
						eur: parseFloat(eur),
						usd: parseFloat(usd),
						eurFoil: parseFloat(eur_foil),
						usdFoil: parseFloat(usd_foil),
						tix: parseFloat(tix)
					};
					collectionSummary.cardsQuantity += quantity;
					collectionSummary.totalEur +=
						quantity * getPrice(priceObj, 'eur', update.isFoil);
					collectionSummary.totalUsd +=
						quantity * getPrice(priceObj, 'usd', update.isFoil);
					if (
						!collectionSummary.languages.includes(update.language)
					) {
						collectionSummary.languages.push(update.language);
					}
				}
			}
		);
		// UPDATE ITEM
		builder.addCase(
			updateCollectionItem.fulfilled,
			({ collectionSummary }, { payload: { data, success } }) => {
				if (success) {
					const { target, update } = data;
					const quantityDiff = update.quantity - target.quantity;

					collectionSummary.cardsQuantity += quantityDiff;
					collectionSummary.totalEur +=
						quantityDiff *
						getPrice(target.prices, 'eur', update.foil);
					collectionSummary.totalUsd +=
						quantityDiff *
						getPrice(target.prices, 'usd', update.foil);
					if (
						!collectionSummary.languages.includes(update.language)
					) {
						collectionSummary.languages.push(update.language);
					}
				}
			}
		);
		// DELETE ITEM
		builder.addCase(
			deleteCollectionItem.fulfilled,
			(state, { payload: { data, success } }) => {
				if (success) {
					const {
						target: { quantity, prices, foil }
					} = data;
					state.collectionSummary.cardsQuantity -= quantity;
					state.collectionSummary.totalEur -=
						quantity * getPrice(prices, 'eur', foil);

					state.collectionSummary.totalUsd -=
						quantity * getPrice(prices, 'usd', foil);
				}
			}
		);
		//BULK ADD ITEMS
		builder.addCase(bulkAddCollectionItems.pending, (state) => {
			state.status = 'bulkAdding';
		});
		builder.addCase(
			bulkAddCollectionItems.fulfilled,
			(state, { payload: { data, error, success } }) => {
				state.status = 'idle';
				if (success && data) {
					state.collectionSummary = {
						...state.collectionSummary,
						maxEur: data.collectionSummary.maxEur,
						maxUsd: data.collectionSummary.maxUsd,
						cardsQuantity: data.collectionSummary.cardsQuantity
					};
					state.asyncStatus = 'idle';
					state.pages = data.pages;
					collectionAdapter.setAll(state, data.cards);
				} else {
					state.asyncStatus = 'rejected';
					state.asyncError = error;
				}
			}
		);
		// BULK DELETE ITEMS
		builder.addCase(
			bulkDeleteCollectionItems.fulfilled,
			(state, { payload: { data, error, success } }) => {
				if (success && data) {
					data.targets.forEach(({ quantity, prices, foil }) => {
						state.collectionSummary.cardsQuantity -= quantity;
						state.collectionSummary.totalEur -=
							quantity * getPrice(prices, 'eur', foil);

						state.collectionSummary.totalUsd -=
							quantity * getPrice(prices, 'usd', foil);
					});
					state.asyncStatus = 'idle';
					state.status = 'idle';
					state.pages = data.pages;
					collectionAdapter.setAll(state, data.cards);
					state.selectedCardIds = [];
				} else {
					state.asyncStatus = 'rejected';
					state.selectedCardIds = [];
					state.asyncError = error;
				}
			}
		);

		// MATCHERS
		builder.addMatcher(
			isAnyOf(
				addCollectionItem.rejected,
				updateCollectionItem.rejected,
				deleteCollectionItem.rejected,
				bulkDeleteCollectionItems.rejected,
				bulkAddCollectionItems.rejected,
				fetchCollection.rejected
			),
			(state) => {
				state.asyncStatus = 'rejected';
				state.asyncError = 'Something went wrong with our server';
			}
		);
		builder.addMatcher(
			isAnyOf(
				addCollectionItem.fulfilled,
				updateCollectionItem.fulfilled,
				deleteCollectionItem.fulfilled
			),
			(state, { payload: { data, error, success } }) => {
				if (success && data) {
					state.asyncStatus = 'fulfilled';
					state.status = 'idle';
					state.targetObject = null;
					state.pages = data.pages;
					collectionAdapter.setAll(state, data.cards);
				} else {
					state.asyncStatus = 'rejected';
					state.status = 'idle';
					state.targetObject = null;
					state.asyncError = error;
				}
			}
		);
		builder.addMatcher(
			isAnyOf(
				addCollectionItem.pending,
				updateCollectionItem.pending,
				deleteCollectionItem.pending,
				bulkDeleteCollectionItems.pending,
				bulkAddCollectionItems.pending,
				fetchCollection.pending
			),
			(state) => {
				state.asyncStatus = 'pending';
				state.asyncError = null;
			}
		);
	}
});

//  ======================================== EXPORTS
export const {
	cardDeselected,
	cardMultiSelected,
	cardSelected,
	currentPageSet,
	filtersReset,
	filterSet,
	pagesSet,
	searchBarInputChanged,
	statusSet
} = collection.actions;

const selectors = collectionAdapter.getSelectors();

export const selectAllCollectionItems = ({
	collection
}: RootState): CollectionItem<MagicCard>[] => selectors.selectAll(collection);
export const selectCurrentPage = ({ collection }: RootState): number =>
	collection.currentPage;
export const selectCollectionSummary = ({
	collection
}: RootState): CollectionSummary => collection.collectionSummary;
export const selectSelectedCardIds = ({ collection }: RootState): string[] =>
	collection.selectedCardIds;
export const selectPages = ({ collection }: RootState): number =>
	collection.pages;
export const selectSearchBarInput = ({ collection }: RootState): string =>
	collection.searchBarInput;
export const selectStatus = ({ collection }: RootState): ActionStatus =>
	collection.status;
export const selectAsyncStatus = ({ collection }: RootState): AsyncStatus =>
	collection.asyncStatus;
export const selectTargetObject = ({
	collection
}: RootState): CollectionItem<MagicCard> => collection.targetObject;
export const selectFilters = ({
	collection
}: RootState): Omit<SearchFilters, 'cardName'> => collection.filters;

//  ======================================== EXPORT DEFAULT
export default collection.reducer;
//  ========================================
