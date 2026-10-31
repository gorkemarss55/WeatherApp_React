//Şehir ismi veya koordinata göre API'ye istek atan fonksiyonlar.
import AxiosInstance from "../config/AxiosConfig";
import { type WeatherType } from "../types/WeatherTypes";

class WeatherService {
    async getWeatherByCity(city:string): Promise<WeatherType> {
        const response = await AxiosInstance.get("/weather", {
            params: { q: city },
        });
        return response.data;
    }
}

export default new WeatherService();