import type { AxiosInstance } from "axios";
import { handleUnauthorizedRedirect } from "./redirectService";

export const unauthorizedInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
      const status = err.status || err.response?.status;
      if (status === 401 || status === 429 || status === 403) {
        handleUnauthorizedRedirect();
      }
      return Promise.reject(err);
    }
  );
};
