import AxiosInstance from "../config/AxiosConfig";
import {type ForecastType } from "../types/WeatherTypes";

class ForecastService{

    async getForecastServiceByCity(city:string):Promise<ForecastType>{
        const response=await AxiosInstance.get("/forecast",{
            params:{q:city}
        });
        return response.data;

    }
}
export default new ForecastService();