// 5 günlük tahmin listesi (başlığı HomePage / CityDetailPage verir).
import { type ForecastType } from "../types/WeatherTypes";
import ForecastItem from "./ForecastItem";

interface ForecastListProps {
  data: ForecastType;
}

function ForecastList({ data }: ForecastListProps) {
  // API 3 saatte bir veri verir (günde 8 veri).
  // Her günün 12:00 tahminini seçerek 5 günlük liste oluşturuyoruz.
  const dailyForecasts = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {dailyForecasts.map((item) => (
        <ForecastItem key={item.dt} item={item} />
      ))}
    </div>
  );
}

export default ForecastList;
