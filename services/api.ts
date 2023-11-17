import { COOKIES_KEY } from "@/common/constants/cookie";
import HTTP_STATUS_CONSTANTS from "@/common/constants/httpStatus";
import { APP_ROUTES } from "@/common/constants/routes";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import Router from "next/router";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get(COOKIES_KEY.ACCESS_TOKEN);
  config.headers.Authorization = "Bearer " + token;

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error?.response?.status === HTTP_STATUS_CONSTANTS.UNAUTHENTICATED) {
      // Cookies.remove(COOKIES_KEY.ACCESS_TOKEN);
      // Cookies.remove(COOKIES_KEY.IS_WS_ADMIN);
      // Router.push(APP_ROUTES.LOGIN);
    }
    if (error?.response?.status === HTTP_STATUS_CONSTANTS.NOT_FOUND) {
      // Router.push(APP_ROUTES.PAGE_404);
    }
    return Promise.reject(error?.response || error);
  }
);

export { api };
