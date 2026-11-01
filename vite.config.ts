import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      
      proxy: {
        "/api": {
          target: "https://api.openweathermap.org",
          changeOrigin: true,
          rewrite: (path: string) =>
            `/data/2.5${path.replace(/^\/api/, "")}${path.includes("?") ? "&" : "?"}appid=${env.WEATHER_API_KEY}`,
        },
      },
    },
  };
});