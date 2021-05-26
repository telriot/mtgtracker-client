export type LangVariant = 'EN' | 'CN' | 'TW' | 'FR' | 'DE' | 'IT' | 'JP' | 'KO' | 'PT' | 'RU' | 'ES'
export type MagicCard = 
{
    cardName: string
    //TODO: download list and parse it
    expansion: string
    language: LangVariant
    foil: boolean,
}
export type CollectionItem<T> = T &
{
    minPrice: number,
    medianPrice: number,
    buyPrice: number,
    targetPrice: number,
    quantity: number
}

//REDUX STORE TYPES
export type ReducerPayload<T> = {payload:T}
export type ThunkAPIReturnValue = { state: any}
export type ThunkReturnValue <T = null> = {
    error: string | null
    success: boolean
    data?: T | null
}
export type AsyncStatus = 'idle' | 'fulfilled' | 'rejected' | 'pending'
export type ActionStatus = 'idle' | 'editing' | 'creating' | 'deleting'
export interface CollectionState 
{
    currentPage: number
    pages: number
    status: ActionStatus
}