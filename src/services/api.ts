import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
baseURL:"https://www.omdbapi.com/?apikey=5368682d",
}); 

export default api;