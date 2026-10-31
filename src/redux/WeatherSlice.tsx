//Hava durumu verisi, yüklenme durumu (loading), aranan şehirler geçmişi.
import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import WeatherService from "../services/WeatherService";
import ForecastService from "../services/ForecastService";
import { type WeatherType, type ForecastType } from "../types/WeatherTypes";

interface WeatherState {
    currentWeather: WeatherType | null;
    forecast: ForecastType | null;
    loading: boolean;
    error: string | null;
}

const initialState: WeatherState = {
    currentWeather: null,
    forecast: null,
    loading: false,
    error: null,
};

export const fetchWeatherData = createAsyncThunk(
    "weather/fetchWeatherData",
    async (city: string) => {
        const weather =await WeatherService.getWeatherByCity(city);
        const forecast =await ForecastService.getForecastServiceByCity(city);
        return { weather, forecast };
    }
);

const WeatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {},//iç senkron işlemler için kullanılır.
    extraReducers: (builder) => {//slice'ın dışında tanımlanmış asenkron aksiyonları veya başka slice'ların aksiyonlarını dinlemek için kullanılır.
        builder
            .addCase(fetchWeatherData.pending, (state) => {// 1. İstek başladığında
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeatherData.fulfilled, (state,action) => {//İstek başarılı bittiğinde
                state.loading = false;
                state.currentWeather = action.payload.weather;
                state.forecast = action.payload.forecast;
            })
            .addCase(fetchWeatherData.rejected,(state)=>{//İstek hata aldığında
                state.loading=false;
                state.error="Hata"
            });

    }

});
export default WeatherSlice.reducer;