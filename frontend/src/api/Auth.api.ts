import axios from "./axios";
import { API_ENDPOINTS } from "./api-config";

export const signupApi = (data: any) => {
  return axios.post(API_ENDPOINTS.AUTH.SIGNUP, data);
};

export const loginApi = (data: any) => {
  return axios.post(API_ENDPOINTS.AUTH.LOGIN, data);
};

export const googleLoginApi = (token: string) => {
  return axios.post(API_ENDPOINTS.AUTH.GOOGLE, { token });
};

export const logoutApi = () => {
  return axios.post(API_ENDPOINTS.AUTH.LOGOUT);
};

export const getMeApi = () => {
  return axios.get(API_ENDPOINTS.AUTH.ME);
};