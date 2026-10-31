import { type ForecastItemType } from "../types/WeatherTypes";

interface ForecastItemProps {
  item: ForecastItemType;
}

function ForecastItem({ item }: ForecastItemProps) {
  const dayName = new Date(item.dt * 1000).toLocaleDateString("tr-TR", {
    weekday: "short",
  });

  return (
    <div className="flex flex-col items-center gap-1 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700/50 shadow-sm">
      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{dayName}</p>
      <img
        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
        alt={item.weather[0].description}
        className="w-14 h-14"
      />
      <p className="text-2xl font-bold text-slate-900 dark:text-white">
        {Math.round(item.main.temp)}°
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 capitalize text-center">
        {item.weather[0].description}
      </p>
    </div>
  );
}

export default ForecastItem;
