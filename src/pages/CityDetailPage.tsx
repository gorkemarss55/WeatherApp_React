import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { fetchWeatherData } from "../redux/WeatherSlice";
import { addFavorite, removeFavorite } from "../redux/FavoriteSlice";
import ForecastList from "../components/ForecastList";

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-700/40 p-4 rounded-2xl">
      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</p>
      <p className="text-lg font-bold text-slate-800 dark:text-white mt-0.5">{value}</p>
    </div>
  );
}

function CityDetailPage() {
  const { cityName } = useParams<{ cityName: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentWeather, forecast, error } = useAppSelector((state) => state.weather);
  const favorites = useAppSelector((state) => state.favorites.favorites);

  // Adresi doğrudan açarsan (ya da sayfayı yenilersen) store boş olur.
  // Store'daki şehir adresteki şehirle aynı değilse veriyi yeniden çek.
  useEffect(() => {
    if (cityName && currentWeather?.name.toLowerCase() !== cityName.toLowerCase()) {
      dispatch(fetchWeatherData(cityName));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityName]);

  const isFavorite = currentWeather
    ? favorites.some((city) => city.toLowerCase() === currentWeather.name.toLowerCase())
    : false;

  const handleFavoriteClick = () => {
    if (!currentWeather) return;
    if (isFavorite) {
      dispatch(removeFavorite(currentWeather.name));
    } else {
      dispatch(addFavorite(currentWeather.name));
    }
  };

  const formatTime = (unixSeconds: number) =>
    new Date(unixSeconds * 1000).toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="min-h-screen bg-[#eef2f7] dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Üst kısım: geri butonu + favori butonu */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ana sayfaya dön</span>
          </button>

          {currentWeather && (
            <button
              type="button"
              onClick={handleFavoriteClick}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-sm font-semibold border transition-all ${
                isFavorite
                  ? "bg-amber-500/10 border-amber-400 text-amber-600 dark:text-amber-400"
                  : "bg-white dark:bg-slate-800 border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700"
              }`}
            >
              <Star className={`w-4 h-4 ${isFavorite ? "fill-amber-400 text-amber-400" : ""}`} />
              <span>{isFavorite ? "Favorilerde" : "Favorilere ekle"}</span>
            </button>
          )}
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 font-medium text-center">
            Şehir bulunamadı veya bağlantı hatası oluştu.
          </div>
        )}

        {/* Şehir kartı + detay kutuları */}
        {currentWeather && (
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700/50 space-y-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {currentWeather.name}, {currentWeather.sys.country}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium capitalize mt-1">
                  {currentWeather.weather[0].description}
                </p>
                <p className="text-7xl font-black text-slate-900 dark:text-white mt-4">
                  {Math.round(currentWeather.main.temp)}°
                </p>
              </div>
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`}
                alt={currentWeather.weather[0].description}
                className="w-28 h-28 sm:w-36 sm:h-36"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Metric label="Hissedilen" value={`${Math.round(currentWeather.main.feels_like)}°`} />
              <Metric label="Nem" value={`%${currentWeather.main.humidity}`} />
              <Metric label="Rüzgar" value={`${Math.round(currentWeather.wind.speed * 3.6)} km/sa`} />
              <Metric label="Basınç" value={`${currentWeather.main.pressure} hPa`} />
              <Metric label="Görüş" value={`${(currentWeather.visibility / 1000).toFixed(1)} km`} />
              <Metric label="Gün batımı" value={formatTime(currentWeather.sys.sunset)} />
            </div>
          </div>
        )}

        {/* Saatlik tahmin (ilk 8 veri = 24 saat) */}
        {forecast && (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700/50 space-y-4">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Saatlik tahmin</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {forecast.list.slice(0, 8).map((item) => (
                <div
                  key={item.dt}
                  className="shrink-0 w-24 flex flex-col items-center gap-1 bg-slate-50 dark:bg-slate-700/40 rounded-2xl py-4"
                >
                  <p className="text-sm text-slate-500 dark:text-slate-400">{formatTime(item.dt)}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    alt={item.weather[0].description}
                    className="w-10 h-10"
                  />
                  <p className="font-bold text-slate-900 dark:text-white">
                    {Math.round(item.main.temp)}°
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5 günlük tahmin */}
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

export default CityDetailPage;
