//  ======================================== IMPORTS
import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter
} from '@reduxjs/toolkit';
import { RootState } from 'reducers';
import {
	ActionStatus,
	CollectionItem,
	CollectionState,
	MagicCard,
	ReducerPayload,
} from 'types';
import { CardUpdate, ThunkReturnValue, ThunkAPIReturnValue } from 'types';
import {
	getCollection,
	destroyCollectionItem,
	patchCollectionItem,
	getCardsByNameViaMKM,
	destroyManyCollectionItems
} from 'api';

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
>('collection/fetchCollection', async ({ id }, ThunkAPI) => {
	const { currentPage, searchBarInput } = ThunkAPI.getState().collection;
	try {
		const { cards, pages } = await getCollection(id, currentPage, {cardName:searchBarInput});
		return {
			data: { cards, pages },
			error: null,
			success: true
		};
	} catch (error) {
		console.error(error);
		return {
			error: 'Something went wrong with our server',
			success: false
		};
	}
});
export const fetchMKMData = createAsyncThunk<ThunkReturnValue<any>, string>(
	'collection/fetchMKMData',
	async (id) => {
		try {
			const response = await getCardsByNameViaMKM(id);
			console.log(response, 'MKM RESPONSE THUNK');
			return { data: {}, error: null, success: true };
		} catch (error) {
			console.error(error);
			return {
				error: 'Something went wrong with our server',
				success: false
			};
		}
	}
);
export const updateCollectionItem = createAsyncThunk<
	ThunkReturnValue<CardUpdate>,
	CardUpdate,
	ThunkAPIReturnValue
>('collection/updateCollectionItem', async (payload, thunkAPI) => {
	try {
		const response = await patchCollectionItem(payload);
		return { data: payload, error: null, success: response };
	} catch (error) {
		console.error(error);
		return {
			error: 'Something went wrong with our server',
			success: false
		};
	}
});

export const deleteCollectionItem = createAsyncThunk<
	ThunkReturnValue<{ id: string; cards: any[]; pages: number }>,
	null,
	ThunkAPIReturnValue
>('collection/deleteCollectionItem', async (_, thunkAPI) => {
	try {
		const { targetObject, currentPage } = thunkAPI.getState().collection;
		const { cards, pages } = await destroyCollectionItem(
			targetObject.id,
			currentPage
		);
		return {
			data: { id: targetObject.id, cards, pages },
			error: null,
			success: true
		};
	} catch (error) {
		console.error(error);
		return {
			error: 'Something went wrong with our server',
			success: false
		};
	}
});
export const bulkDeleteCollectionItems = createAsyncThunk<
	ThunkReturnValue<{ ids: string[]; cards: any[]; pages: number }>,
	null,
	ThunkAPIReturnValue
>('collection/bulkDeleteCollectionItems', async (_, thunkAPI) => {
	try {
		const { selectedCardIds, currentPage } = thunkAPI.getState().collection;
		const { cards, pages } = await destroyManyCollectionItems(
			selectedCardIds,
			currentPage
		);
		return {
			data: { ids: selectedCardIds, cards, pages },
			error: null,
			success: true
		};
	} catch (error) {
		console.error(error);
		return {
			error: 'Something went wrong with our server',
			success: false
		};
	}
});
//  ======================================== INITIAL STATE

const initialState = collectionAdapter.getInitialState({
	currentPage: 1,
	status: 'idle',
	asyncError: null,
	asyncStatus: 'idle',
	pages: 0,
	searchBarInput: '',
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
		builder.addCase(fetchCollection.pending, (state) => {
			state.asyncStatus = 'pending';
		});
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
		builder.addCase(fetchCollection.rejected, (state) => {
			state.asyncStatus = 'rejected';
		});

		// UPDATE ITEM
		builder.addCase(updateCollectionItem.pending, (state) => {
			state.asyncStatus = 'pending';
		});
		builder.addCase(
			updateCollectionItem.fulfilled,
			(state, { payload: { data, error, success } }) => {
				if (success && data) {
					state.asyncStatus = 'idle';
					state.status = 'idle';
					state.targetObject = 'null';
					collectionAdapter.updateOne(state, {
						id: data.id,
						changes: data
					});
				} else {
					state.asyncStatus = 'rejected';
					state.targetObject = 'null';
					state.asyncError = error;
				}
			}
		);
		builder.addCase(updateCollectionItem.rejected, (state) => {
			state.asyncStatus = 'rejected';
			state.targetObject = 'null';
		});

		// DELETE ITEM
		builder.addCase(deleteCollectionItem.pending, (state) => {
			state.asyncStatus = 'pending';
		});
		builder.addCase(
			deleteCollectionItem.fulfilled,
			(state, { payload: { data, error, success } }) => {
				if (success && data) {
					state.asyncStatus = 'idle';
					state.status = 'idle';
					state.targetObject = 'null';
					state.pages = data.pages;
					collectionAdapter.setAll(state, data.cards);
					// collectionAdapter.removeOne(state, data.id) ;
				} else {
					state.asyncStatus = 'rejected';
					state.targetObject = 'null';
					state.asyncError = error;
				}
			}
		);
		builder.addCase(deleteCollectionItem.rejected, (state) => {
			state.asyncStatus = 'rejected';
			state.targetObject = 'null';
		});
		// DELETE ITEM
		builder.addCase(bulkDeleteCollectionItems.pending, (state) => {
			state.asyncStatus = 'pending';
		});
		builder.addCase(
			bulkDeleteCollectionItems.fulfilled,
			(state, { payload: { data, error, success } }) => {
				if (success && data) {
					state.asyncStatus = 'idle';
					state.status = 'idle';
					state.pages = data.pages;
					collectionAdapter.setAll(state, data.cards);
					state.selectedCardIds = [];
					// collectionAdapter.removeOne(state, data.id) ;
				} else {
					state.asyncStatus = 'rejected';
					state.selectedCardIds = [];
					state.asyncError = error;
				}
			}
		);
		builder.addCase(bulkDeleteCollectionItems.rejected, (state) => {
			state.asyncStatus = 'rejected';
		});
	}
});

//  ======================================== EXPORTS
export const {
	cardDeselected,
	cardMultiSelected,
	cardSelected,
	currentPageSet,
	pagesSet,
	searchBarInputChanged,
	statusSet
} = collection.actions;

const selectors = collectionAdapter.getSelectors();

export const selectAllCollectionItems = ({ collection }: RootState) =>
	selectors.selectAll(collection);
export const selectCurrentPage = ({ collection }: RootState) =>
	collection.currentPage;
export const selectSelectedCardIds = ({ collection }: RootState) =>
	collection.selectedCardIds;
export const selectPages = ({ collection }: RootState) => collection.pages;
export const selectSearchBarInput = ({ collection }: RootState) => collection.searchBarInput;
export const selectStatus = ({ collection }: RootState) => collection.status;
export const selectAsyncStatus = ({ collection }: RootState) =>
	collection.asyncStatus;
export const selectTargetObject = ({ collection }: RootState) =>
	collection.targetObject;

//  ======================================== EXPORT DEFAULT
export default collection.reducer;
//  ========================================
