import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CityDetailPage from "../pages/CityDetailPage";

function RouterConfig(){
    return(
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/detail/:cityName" element={<CityDetailPage/>} />
            </Routes>
    )

}
export default RouterConfig;

