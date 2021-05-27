//  ======================================== IMPORTS
import { combineReducers } from "@reduxjs/toolkit"
import collection from 'features/collection/collectionSlice'
//  ========================================

const Reducers = combineReducers
({
    collection
});

//  ======================================== EXPORTS
export type RootState = ReturnType<typeof Reducers>
export default Reducers;
//  ========================================
