import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchWeatherData } from "./WeatherSlice";
interface AppState {
    theme: "light" | "dark";
    loading:boolean;
}
const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

const initialState: AppState = {
    theme: savedTheme || "light",
    loading:false,

};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "dark" ? "light" : "dark"
            localStorage.setItem("theme", state.theme);
        },
        setTheme: (state, action: PayloadAction<"light" | "dark">) => {
            state.theme = action.payload;
            localStorage.setItem("theme", action.payload);
        },
    },
    extraReducers: (builder) => {
    builder
        .addCase(fetchWeatherData.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchWeatherData.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(fetchWeatherData.rejected, (state) => {
            state.loading = false;
        });
}
});

export const { toggleTheme, setTheme } = appSlice.actions;
export default appSlice.reducer;
    
