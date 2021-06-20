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
	ReducerPayload
} from 'types';
import { CardUpdate, ThunkReturnValue, ThunkAPIReturnValue } from 'types';
import {
	getCardsFromCollection,
	getCollectionSummary,
	destroyCollectionItem,
	patchCollectionItem,
	postCollectionItem,
	destroyManyCollectionItems,
	TEST_COLLECTION_ID
} from 'api';
import stdErrorHandler from 'common/utils/redux/stdErrorHandler';
import stdSuccessHandler from 'common/utils/redux/stdSuccessHandler';

//  ======================================== ENTITIES
export const collectionAdapter = createEntityAdapter<CollectionItem<MagicCard>>(
	{
		selectId: (card) => card.id,
		sortComparer: (a, b) => a.cardName.localeCompare(b.cardName || '')
	}
);
//  ======================================== THUNKS
export const fetchCollection = createAsyncThunk<
	ThunkReturnValue<{ cards: any[]; pages: number }>,
	{ id: string },
	ThunkAPIReturnValue
>('collection/fetchCollection', async ({ id }, thunkAPI) => {
	const { currentPage, searchBarInput } = thunkAPI.getState().collection;
	try {
		const { cards, pages } = await getCardsFromCollection(
			TEST_COLLECTION_ID,
			currentPage,
			{ cardName: searchBarInput }
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
	ThunkReturnValue<{ cards: any[]; pages: number }>,
	CardCreationPayload,
	ThunkAPIReturnValue
>('collection/addCollectionItem', async (payload, thunkAPI) => {
	try {
		const { currentPage, searchBarInput } = thunkAPI.getState().collection;
		const { cards, pages } = await postCollectionItem(
			TEST_COLLECTION_ID,
			currentPage,
			{ cardName: searchBarInput },
			payload
		);
		return stdSuccessHandler({ cards, pages });
	} catch (error) {
		return stdErrorHandler(error);
	}
});
export const updateCollectionItem = createAsyncThunk<
	ThunkReturnValue<{ cards: any[]; pages: number }>,
	CardUpdate,
	ThunkAPIReturnValue
>('collection/updateCollectionItem', async (payload, thunkAPI) => {
	try {
		const { currentPage, searchBarInput } = thunkAPI.getState().collection;
		const { cards, pages } = await patchCollectionItem(
			TEST_COLLECTION_ID,
			payload.id,
			currentPage,
			{ cardName: searchBarInput },
			payload
		);
		return stdSuccessHandler({ cards, pages });
	} catch (error) {
		return stdErrorHandler(error);
	}
});

export const deleteCollectionItem = createAsyncThunk<
	ThunkReturnValue<{ id: string; cards: any[]; pages: number }>,
	null,
	ThunkAPIReturnValue
>('collection/deleteCollectionItem', async (_, thunkAPI) => {
	try {
		const { targetObject, currentPage, searchBarInput } =
			thunkAPI.getState().collection;
		const { cards, pages } = await destroyCollectionItem(
			TEST_COLLECTION_ID,
			targetObject.id,
			currentPage,
			{ cardName: searchBarInput }
		);
		return stdSuccessHandler({ id: targetObject.id, cards, pages });
	} catch (error) {
		return stdErrorHandler(error);
	}
});
export const bulkDeleteCollectionItems = createAsyncThunk<
	ThunkReturnValue<{ ids: string[]; cards: any[]; pages: number }>,
	null,
	ThunkAPIReturnValue
>('collection/bulkDeleteCollectionItems', async (_, thunkAPI) => {
	try {
		const { selectedCardIds, currentPage, searchBarInput } =
			thunkAPI.getState().collection;
		const { cards, pages } = await destroyManyCollectionItems(
			TEST_COLLECTION_ID,
			selectedCardIds,
			currentPage,
			{ cardName: searchBarInput }
		);
		return stdSuccessHandler({ id: selectedCardIds, cards, pages });
	} catch (error) {
		return stdErrorHandler(error);
	}
});
//  ======================================== INITIAL STATE

const initialState = collectionAdapter.getInitialState({
	currentPage: 1,
	collectionSummary: null,
	summaryStatus: 'idle',
	status: 'idle',
	asyncError: null,
	asyncStatus: 'idle',
	pages: 0,
	searchBarInput: '',
	filters: {
		expansion: '',
		language: 'EN',
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
		filterSet: (state, {payload}: ReducerPayload<{filter: FilterKey , value: string}>) =>{
			state.filters[payload.filter as string] = payload.value
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
				target?: CollectionItem<any> | null;
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
					state.collectionSummary = data.collectionSummary;
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
		// BULK DELETE ITEMS
		builder.addCase(
			bulkDeleteCollectionItems.fulfilled,
			(state, { payload: { data, error, success } }) => {
				if (success && data) {
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
				fetchCollection.rejected
			),
			(state) => {
				state.asyncStatus = 'rejected';
				state.targetObject = null;
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
	filterSet,
	pagesSet,
	searchBarInputChanged,
	statusSet
} = collection.actions;

const selectors = collectionAdapter.getSelectors();

export const selectAllCollectionItems = ({ collection }: RootState) =>
	selectors.selectAll(collection);
export const selectCurrentPage = ({ collection }: RootState) =>
	collection.currentPage;
export const selectCollectionSummary = ({ collection }: RootState) =>
	collection.collectionSummary;
export const selectSelectedCardIds = ({ collection }: RootState) =>
	collection.selectedCardIds;
export const selectPages = ({ collection }: RootState) => collection.pages;
export const selectSearchBarInput = ({ collection }: RootState) =>
	collection.searchBarInput;
export const selectStatus = ({ collection }: RootState) => collection.status;
export const selectAsyncStatus = ({ collection }: RootState) =>
	collection.asyncStatus;
export const selectTargetObject = ({ collection }: RootState) =>
	collection.targetObject;
export const selectFilters = ({ collection }: RootState) => collection.filters;
//  ======================================== EXPORT DEFAULT
export default collection.reducer;
//  ========================================
