import { useState, useEffect, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { fetchWeatherData } from "../redux/WeatherSlice";
import { toggleTheme } from "../redux/AppSlice";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";
import FavoriteCities from "../components/FavoriCities";
import { Search, Sun, Moon } from "lucide-react";

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.appSlice.theme);
  const { currentWeather, forecast, error } = useAppSelector((state) => state.weather);

  // Sayfa ilk açıldığında hiç veri yoksa varsayılan şehri getir
  useEffect(() => {
    if (!currentWeather) {
      dispatch(fetchWeatherData("Istanbul"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(fetchWeatherData(searchTerm.trim()));
      setSearchTerm("");
    }
  };

  return (
    <div className="min-h-screen bg-[#eef2f7] dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Üst kısım: başlık + arama + tema butonu */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Hava Durumu
          </h1>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                aria-label="Şehir ara"
                placeholder="Şehir ara, örn. Ankara"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-80 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border-0 shadow-sm text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white placeholder-slate-400"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl text-sm transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span>Ara</span>
              </button>
            </form>

            <button
              type="button"
              onClick={() => dispatch(toggleTheme())}
              className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
              title="Temayı değiştir"
              aria-label="Temayı değiştir"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>
          </div>
        </header>

        {/* Hata mesajı */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 font-medium text-center">
            Şehir bulunamadı veya bağlantı hatası oluştu.
          </div>
        )}

        {/* Sol: anlık hava kartı / Sağ: favori şehirler */}
        {currentWeather && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WeatherCard data={currentWeather} />
            </div>
            <div>
              <FavoriteCities />
            </div>
          </div>
        )}

        {/* Alt kısım: 5 günlük tahmin */}
        {forecast && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">5 günlük tahmin</h2>
            <ForecastList data={forecast} />
          </div>
        )}

      </div>
    </div>
  );
}

export default HomePage;
