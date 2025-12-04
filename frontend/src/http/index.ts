import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";

const $host = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const $authhost = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const authInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders;
  }
  // Устанавливаем токен
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};
$authhost.interceptors.request.use(authInterceptor);

export { $host, $authhost };
