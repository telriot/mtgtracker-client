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
	ReducerPayload
} from 'types';
import { CardUpdate, ThunkReturnValue, ThunkAPIReturnValue } from 'types';
import { getCollection, destroyCollectionItem, patchCollectionItem } from 'api';

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
	const { currentPage } = ThunkAPI.getState().collection;
	try {
		const { cards, pages } = await getCollection(id, currentPage);
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
export const deleteCollectionItem = createAsyncThunk<ThunkReturnValue<{id:string}>, null, ThunkAPIReturnValue>
	('collection/deleteCollectionItem', async (_, thunkAPI) => {
	try {
		const {id} = thunkAPI.getState().collection.targetObject
		const result = await destroyCollectionItem(id)
		return {data:{id}, error:null, success: result}
	}
	
	catch (error) {
		console.error(error);
		return {error : 'Something went wrong with our server', success: false}
	}
})
//  ======================================== INITIAL STATE

const initialState = collectionAdapter.getInitialState({
	currentPage: 1,
	status: 'idle',
	asyncError: null,
	asyncStatus: 'idle',
	pages: 0,
	targetObject: null
} as CollectionState);

//  ======================================== SLICES
const collection = createSlice({
	name: 'collection',
	initialState,
	reducers: {
		currentPageSet: (state, { payload }: ReducerPayload<number>) => {
			state.currentPage = payload;
		},
		pagesSet: (state, { payload }: ReducerPayload<number>) => {
			state.pages = payload;
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
		builder.addCase(updateCollectionItem.pending, (state) => {
			state.asyncStatus = 'pending';
		});
		builder.addCase(
			updateCollectionItem.fulfilled,
			(state, { payload: { data, error, success } }) => {
				if (success && data) {
					state.asyncStatus = 'idle';
					state.status = 'idle'
					state.targetObject = 'null'
					collectionAdapter.updateOne(state, {
						id: data.id,
						changes: data
					});
				} else {
					state.asyncStatus = 'rejected';
					state.targetObject = 'null'
					state.asyncError = error;
				}
			}
		);
		builder.addCase(updateCollectionItem.rejected, (state) => {
			state.asyncStatus = 'rejected';
			state.targetObject = 'null'
		});
		builder.addCase(deleteCollectionItem.pending, (state) => {
			state.asyncStatus = 'pending';
		});
		builder.addCase(
			deleteCollectionItem.fulfilled,
			(state, { payload: { data, error, success } }) => {
				if (success && data) {
					state.asyncStatus = 'idle';
					state.status = 'idle'
					state.targetObject = 'null'
					collectionAdapter.removeOne(state, data.id) ;
				} else {
					state.asyncStatus = 'rejected';
					state.targetObject = 'null'
					state.asyncError = error;
				}
			}
		);
		builder.addCase(deleteCollectionItem.rejected, (state) => {
			state.asyncStatus = 'rejected';
			state.targetObject = 'null'
		});
	}
});

//  ======================================== EXPORTS
export const { currentPageSet, pagesSet, statusSet } = collection.actions;

const selectors = collectionAdapter.getSelectors();

export const selectAllCollectionItems = ({ collection }: RootState) =>
	selectors.selectAll(collection);
export const selectCurrentPage = ({ collection }: RootState) =>
	collection.currentPage;
export const selectPages = ({ collection }: RootState) => collection.pages;
export const selectStatus = ({ collection }: RootState) => collection.status;
export const selectAsyncStatus = ({ collection }: RootState) =>
	collection.asyncStatus;
export const selectTargetObject = ({ collection }: RootState) =>
	collection.targetObject;

//  ======================================== EXPORT DEFAULT
export default collection.reducer;
//  ========================================
