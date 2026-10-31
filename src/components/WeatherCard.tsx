import type { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { addFavorite, removeFavorite } from "../redux/FavoriteSlice";
import { Star } from "lucide-react";
import type { WeatherType } from "../types/WeatherTypes";

interface WeatherCardProps {
  data: WeatherType;
}

function WeatherCard({ data }: WeatherCardProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // Store'da anahtar adı "favorites" (Store.tsx), bu yüzden state.favorites.favorites
  const favorites = useAppSelector((state) => state.favorites.favorites);

  const isFavorite = favorites.some(
    (city) => city.toLowerCase() === data.name.toLowerCase()
  );

  const handleFavoriteClick = (e: MouseEvent) => {
    e.stopPropagation(); // Karta tıklayıp detay sayfasına gitmesini engeller
    if (isFavorite) {
      dispatch(removeFavorite(data.name));
    } else {
      dispatch(addFavorite(data.name));
    }
  };

  return (
    <div
      onClick={() => navigate(`/detail/${data.name}`)}
      className="cursor-pointer bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700/50 hover:shadow-md transition-all group"
    >
      <div className="flex justify-between items-start">
        {/* Sol: şehir adı, açıklama, büyük sıcaklık */}
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {data.name}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium capitalize mt-1">
            {data.weather[0].description}
          </p>
          <div className="text-6xl font-black text-slate-900 dark:text-white mt-4">
            {Math.round(data.main.temp)}°
          </div>
        </div>

        {/* Sağ: ikon ve favori butonu */}
        <div className="flex flex-col items-end gap-3">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
            alt={data.weather[0].description}
            className="w-20 h-20 -mr-2"
          />
          <button
            type="button"
            onClick={handleFavoriteClick}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isFavorite
                ? "bg-amber-500/10 border-amber-400 text-amber-600 dark:text-amber-400"
                : "bg-white dark:bg-slate-700 border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-600"
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${isFavorite ? "fill-amber-400 text-amber-400" : ""}`} />
            <span>{isFavorite ? "Favorilerde" : "Favorilere ekle"}</span>
          </button>
        </div>
      </div>

      {/* Alt kutular: hissedilen, nem, rüzgar */}
      <div className="grid grid-cols-3 gap-3 mt-8">
        <div className="bg-slate-50 dark:bg-slate-700/40 p-3.5 rounded-2xl">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Hissedilen</p>
          <p className="text-lg font-bold text-slate-800 dark:text-white mt-0.5">
            {Math.round(data.main.feels_like)}°
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-700/40 p-3.5 rounded-2xl">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Nem</p>
          <p className="text-lg font-bold text-slate-800 dark:text-white mt-0.5">
            %{data.main.humidity}
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-700/40 p-3.5 rounded-2xl">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Rüzgar</p>
          <p className="text-lg font-bold text-slate-800 dark:text-white mt-0.5">
            {Math.round(data.wind.speed * 3.6)} km/sa
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
