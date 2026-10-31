//OpenWeatherMap / WeatherAPI baseURL ve params ayarları.
import axios from "axios";

const AxiosInstance=axios.create({
    baseURL:"https://api.openweathermap.org/data/2.5",
    params: {//Uygulamanın her isteğinde aynı oldukları için bunlar buraya yazıldı.
        appid: import.meta.env.VITE_WEATHER_API_KEY,
        units: "metric",
        lang: "tr",
    },
});
export default AxiosInstance;