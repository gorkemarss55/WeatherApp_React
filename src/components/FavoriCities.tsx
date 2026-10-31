import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { fetchWeatherData } from "../redux/WeatherSlice";
import { removeFavorite } from "../redux/FavoriteSlice";
import { X } from "lucide-react";

function FavoriteCities() {
  const dispatch = useAppDispatch();
  // Store'da anahtar adı "favorites" (Store.tsx), bu yüzden state.favorites.favorites
  const favorites = useAppSelector((state) => state.favorites.favorites);

  if (favorites.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700/50">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Favori şehirler</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Henüz favori şehir yok. Bir şehri aratıp "Favorilere ekle" butonuna tıkla.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700/50">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Favori şehirler</h3>
      <div className="space-y-2">
        {favorites.map((city) => (
          <div
            key={city}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all group"
          >
            <button
              type="button"
              onClick={() => dispatch(fetchWeatherData(city))}
              className="text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 text-left flex-1"
            >
              {city}
            </button>
            <button
              type="button"
              onClick={() => dispatch(removeFavorite(city))}
              className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
              title="Favorilerden çıkar"
              aria-label={`${city} şehrini favorilerden çıkar`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteCities;
