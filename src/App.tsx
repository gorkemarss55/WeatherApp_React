import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RouterConfig from "./config/RouterConfig";
import Spinner from "./components/Spinner";
import { useAppSelector } from "./redux/Hooks";

function App() {
  const theme = useAppSelector((state) => state.appSlice.theme);

  // Tema değişince <html> etiketine "dark" sınıfını ekler/kaldırır.
  // Burada olduğu için tüm sayfalarda (ana sayfa, detay) çalışır.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Spinner />
      <RouterConfig />
    </BrowserRouter>
  );
}

export default App;
