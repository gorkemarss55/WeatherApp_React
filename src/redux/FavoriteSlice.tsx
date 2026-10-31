import { createSlice } from "@reduxjs/toolkit";
import {type PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState{
    favorites:string[];
}
const savedFavorites=localStorage.getItem("favorites");

const initialState:FavoriteState={
    favorites: savedFavorites ? JSON.parse(savedFavorites) : ["Samsun","Sivas","Ankara", "İzmir", "Antalya"],
}

const FavoriteSlice=createSlice({
    name:"favorites",
    initialState,
    reducers:{
        addFavorite(state,action:PayloadAction<string>){
            const filtered=state.favorites.filter((city)=>city.toLowerCase()!==action.payload.toLowerCase());
            state.favorites=[action.payload,...filtered].slice(0,5);
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        },
        removeFavorite(state,action:PayloadAction<string>){
            state.favorites=state.favorites.filter((city)=>city.toLowerCase()!== action.payload.toLowerCase());
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        }

    }
});
export const { addFavorite, removeFavorite } = FavoriteSlice.actions;
export default FavoriteSlice.reducer;