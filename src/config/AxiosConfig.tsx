import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: "/api",
    params: {
        units: "metric",
        lang: "tr",
    },
});

export default AxiosInstance;