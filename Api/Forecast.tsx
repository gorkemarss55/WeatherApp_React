import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ message: "Sunucuda API key tanımlı değil" });
  }

  // Sadece izin verilen parametreler iletilir
  const params = new URLSearchParams({ appid: apiKey });
  for (const key of ["q", "units", "lang"]) {
    const value = req.query[key];
    if (typeof value === "string" && value) params.set(key, value);
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?${params}`
    );
    const data = await response.json();

    if (response.ok) {
      // Aynı şehir 10 dakika boyunca önbellekten gelir (API limitini korur)
      res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=60");
    }
    return res.status(response.status).json(data);
  } catch {
    return res.status(502).json({ message: "Hava durumu servisine ulaşılamadı" });
  }
}