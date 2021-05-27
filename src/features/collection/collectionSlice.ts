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
	ReducerPayload
} from 'types';
import { ThunkReturnValue, ThunkAPIReturnValue } from 'types';
import { getCollection } from 'api';

//  ======================================== ENTITIES
export const collectionAdapter = createEntityAdapter<CollectionItem<any>>({
	selectId: (card) => card.id,
	sortComparer: (a, b) => a.cardName.localeCompare(b.cardName || '')
});
//  ======================================== THUNKS
export const fetchCollection = createAsyncThunk<
	ThunkReturnValue<any>,
	{ id: string }
>('collection/fetchCollection', async ({ id }) => {
	try {
		const cards = await getCollection(id);
		return { data: {cards}, error: null, success: true };
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
	pages: 10,
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
	}
});

//  ======================================== EXPORTS
export const { currentPageSet, pagesSet, statusSet } = collection.actions;

const selectors = collectionAdapter.getSelectors();

export const selectAllCollectionItems = ({ Collection }: RootState) =>
	selectors.selectAll(Collection);
export const selectCurrentPage = ({ Collection }: RootState) =>
	Collection.currentPage;
export const selectPages = ({ Collection }: RootState) => Collection.pages;
export const selectStatus = ({ Collection }: RootState) => Collection.status;
export const selectTargetObject = ({ Collection }: RootState) =>
	Collection.targetObject;

//  ======================================== EXPORT DEFAULT
export default collection.reducer;
//  ========================================
