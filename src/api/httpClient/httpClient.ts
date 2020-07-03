import axios from "axios";
import authInterceptor from "./authInterceptor";
import errorInterceptor from "./errorInterceptor";
import responseInterceptor from "./responseInterceptor";

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  timeout: 5000
});

httpClient.interceptors.request.use(authInterceptor);
httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

export default httpClient;
