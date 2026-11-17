import axios from "axios";
import { normalizeApiResponse } from "./api-response";
import { installSessionInterceptors } from "./session-requests";

export const API_ROOT =
  process.env.VUE_APP_ENV === "production"
    ? process.env.VUE_APP_BASE_URL
    : process.env.VUE_APP_DEV_BASE_URL;

export const axiosSvc = axios.create({
  baseURL: API_ROOT,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

installSessionInterceptors(axiosSvc, window.localStorage, () => {
  window.dispatchEvent(new Event("mea:session-expired"));
});
axiosSvc.interceptors.response.use(normalizeApiResponse);
