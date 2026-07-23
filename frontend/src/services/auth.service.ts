import { API_ENDPOINTS } from "@/providers/api-config";
import axios from "@/providers/axios";

// SIGNUP
export const signupApi = async (data: any) => {
  try {
    const response = await axios.post(API_ENDPOINTS.AUTH.SIGNUP, data);
    return response;
  } catch (error) {
    console.error("Signup API Error:", error);
    throw error;
  }
};

// LOGIN
export const loginApi = async (data: any) => {
  try {
    const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, data);
    return response;
  } catch (error) {
    console.error("Login API Error:", error);
    throw error;
  }
};

// GOOGLE LOGIN
export const googleLoginApi = async (token: string) => {
  try {
    const response = await axios.post(API_ENDPOINTS.AUTH.GOOGLE, { token });
    return response;
  } catch (error) {
    console.error("Google Login API Error:", error);
    throw error;
  }
};

// LOGOUT
export const logoutApi = async () => {
  try {
    const response = await axios.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response;
  } catch (error) {
    console.error("Logout API Error:", error);
    throw error;
  }
};

// GET CURRENT USER
export const getMeApi = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.AUTH.ME);
    return response;
  } catch (error) {
    console.error("Get Me API Error:", error);
    throw error;
  }
};

// FORGOT PASSWORD
export const forgotPasswordApi = async (email: string) => {
  try {
    const response = await axios.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      email,
    });
    return response;
  } catch (error) {
    console.error("Forgot Password API Error:", error);
    throw error;
  }
};

// RESET PASSWORD
export const resetPasswordApi = async (token: string, password: string) => {
  try {
    const response = await axios.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      password,
    });
    return response;
  } catch (error) {
    console.error("Reset Password API Error:", error);
    throw error;
  }
};

// COMPLETE PROFILE
export const completeProfileApi = async (data: any) => {
  try {
    const response = await axios.post(API_ENDPOINTS.USER.PROFILE, data);
    return response;
  } catch (error) {
    console.error("Complete Profile API Error:", error);
    throw error;
  }
};
