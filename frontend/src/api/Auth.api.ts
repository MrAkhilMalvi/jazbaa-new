import axios from "./axios";
import { API_ENDPOINTS } from "./api-config";

// SIGNUP
export const signupApi = (data: any) => {
  return axios.post(API_ENDPOINTS.AUTH.SIGNUP, data);
};

// LOGIN
export const loginApi = (data: any) => {
  return axios.post(API_ENDPOINTS.AUTH.LOGIN, data);
};

// GOOGLE LOGIN
export const googleLoginApi = (token: string) => {
  return axios.post(API_ENDPOINTS.AUTH.GOOGLE, { token });
};

// LOGOUT
export const logoutApi = () => {
  return axios.post(API_ENDPOINTS.AUTH.LOGOUT);
};

// GET CURRENT USER
export const getMeApi = () => {
  return axios.get(API_ENDPOINTS.AUTH.ME);
};

// FORGOT PASSWORD
export const forgotPasswordApi = (email: string) => {
  return axios.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
};

// RESET PASSWORD
export const resetPasswordApi = (token: string, password: string) => {
  return axios.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
    token,
    password,
  });
};
