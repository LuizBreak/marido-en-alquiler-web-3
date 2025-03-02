import axios from "axios";

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
