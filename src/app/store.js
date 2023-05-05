import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import itemReducer from "../features/inventory/redux/itemSlice"
import trashReducer from "../features/trash/redux/trashSlice"
import userReducer from "../features/auth/redux/userSlice"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        user: userReducer,
        item: itemReducer,
        trash: trashReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})
