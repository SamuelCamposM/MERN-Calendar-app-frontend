import axios from "axios";
import { getEnvVariables } from "../helpers";
const { VITE_API_URL } = getEnvVariables();
const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

//todo: CONFIGURAR INTERCEPTORES
calendarApi.interceptors.request.use((config) => {
  console.log(localStorage.getItem("token"));
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };
  return config;
});

export default calendarApi;
