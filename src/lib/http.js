import axios from "axios";
import { HTTP } from "../constants";

const http = (contentType = "application/json") => {
  const axiosInstance = axios.create({
    baseURL: HTTP,
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      config.headers = {
        Authorization: `Bearer ${""}`,
        Accept: "application/json",
        "Content-Type": contentType,
      };
      return config;
    },
    (err) => Promise.reject(err)
  );

  axiosInstance.interceptors.response.use(
    (res) => res.data,
    (err) => Promise.reject(err)
  );
  return axiosInstance;
};

export default http;
