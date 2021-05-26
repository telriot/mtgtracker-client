//  ======================================== IMPORTS
import { configureStore, getDefaultMiddleware, Action } from "@reduxjs/toolkit"
import { ThunkAction } from "redux-thunk"
import Reducers, { RootState } from 'reducers'

//  ======================================== CONFIGURE STORE
const Store = configureStore(
{
    reducer: Reducers,
    middleware: getDefaultMiddleware(),
})
//  ========================================

export type AppDispatch = typeof Store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
export default Store