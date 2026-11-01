// Netlify sunucu fonksiyonu: tarayıcıdan gelen isteği OpenWeatherMap'e iletir.
// API key sadece burada (sunucuda) okunur, tarayıcıya hiç gitmez.
export default async (req: Request) => {
  const apiKey = Netlify.env.get("WEATHER_API_KEY");
  if (!apiKey) {
    return Response.json({ message: "Sunucuda API key tanımlı değil" }, { status: 500 });
  }

  // Sadece izin verilen parametreler iletilir
  const incoming = new URL(req.url).searchParams;
  const params = new URLSearchParams({ appid: apiKey });
  for (const key of ["q", "units", "lang"]) {
    const value = incoming.get(key);
    if (value) params.set(key, value);
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?${params}`
    );
    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch {
    return Response.json({ message: "Hava durumu servisine ulaşılamadı" }, { status: 502 });
  }
};