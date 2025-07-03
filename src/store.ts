import { configureStore } from "@reduxjs/toolkit";
import tableActionsReducer from './tableActionsSlice'

export const store = configureStore({
    reducer: {
        users: tableActionsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch