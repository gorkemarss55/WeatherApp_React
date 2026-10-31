import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./WeatherSlice";
import FavoriteReducer from "./FavoriteSlice"
import AppSlice from"./AppSlice"
export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        favorites: FavoriteReducer,
        appSlice:AppSlice,
        
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;