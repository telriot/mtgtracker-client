//  ======================================== IMPORTS
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'reducers';
import { ActionStatus, CollectionState, ReducerPayload } from 'types';
//  ======================================== INITIAL STATE

const initialState = {
	currentPage: 1,
	status: 'idle',
	pages: 10
} as CollectionState;

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
		statusSet:(state, { payload }: ReducerPayload<ActionStatus>) => {
			state.status = payload;
		}
	}
});

//  ======================================== EXPORTS
export const {
	currentPageSet,
	pagesSet,
	statusSet
} = collection.actions;

export const selectCurrentPage = ({ Collection }: RootState) =>
	Collection.currentPage;
export const selectPages = ({ Collection }: RootState) => Collection.pages;
export const selectStatus = ({ Collection }: RootState) => Collection.status;
//  ======================================== EXPORT DEFAULT
export default collection.reducer;
//  ========================================
