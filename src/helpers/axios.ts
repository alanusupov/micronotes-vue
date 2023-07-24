import axios from "axios";
import defaultUrl from "./constants";

let AxiosInstance = axios.create({
  baseURL: defaultUrl,
  timeout: 5000,
  headers: { "x-access-token": localStorage.getItem("token") }, // on the first go token is null
});

// AxiosInstance.interceptors.request.use(function (config) {
//   axios.defaults.headers.common["x-access-token"] =
//     localStorage.getItem("token");

//   return config;
// });
AxiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
axios.defaults.headers.common["x-access-token"] = localStorage.getItem("token");
export default AxiosInstance;
// axios.defaults.headers["Authorization"] =
//   "Bearer " + localStorage.getItem("token");
