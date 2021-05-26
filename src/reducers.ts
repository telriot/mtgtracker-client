//  ======================================== IMPORTS
import { combineReducers } from "@reduxjs/toolkit"
import Collection from 'features/collection/collectionSlice'
//  ========================================

const Reducers = combineReducers
({
    Collection
});

//  ======================================== EXPORTS
export type RootState = ReturnType<typeof Reducers>
export default Reducers;
//  ========================================
