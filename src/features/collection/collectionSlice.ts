//  ======================================== IMPORTS
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'reducers';
import { ActionStatus, CollectionItem, CollectionState, ReducerPayload } from 'types';
//  ======================================== INITIAL STATE

const initialState = {
	currentPage: 1,
	status: 'idle',
	pages: 10,
	targetObject: null
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
		statusSet:(state, { payload }: ReducerPayload<{status: ActionStatus, target?:CollectionItem<any> | null}>) => {
			state.status = payload.status;
			state.targetObject = payload.target || null
		},
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
export const selectTargetObject = ({ Collection }: RootState) => Collection.targetObject;
//  ======================================== EXPORT DEFAULT
export default collection.reducer;
//  ========================================
