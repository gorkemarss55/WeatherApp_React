// 1. Anlık Hava Durumu Tipi (/weather)
export interface WeatherType {
    name: string;
    visibility: number;
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
        feels_like: number;
        pressure: number;
    };
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    weather: {
        id?: number;
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
    };
}

// 2. WeatherType içindeki tipleri miras alan ForecastItemType
export interface ForecastItemType {
    dt: number;
    dt_txt: string;
    main: WeatherType["main"];      
    weather: WeatherType["weather"]; 
    wind: WeatherType["wind"];      
    pop?: number;                  
}

// 3. /forecast API'sinden dönen ana yanıtın tipi
export interface ForecastType {
    list: ForecastItemType[];
    city: {
        id: number;
        name: string;
        country: string;
        sunrise: number;
        sunset: number;
    };
}