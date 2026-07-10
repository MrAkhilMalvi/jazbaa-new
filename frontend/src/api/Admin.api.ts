import axios from "./axios";
import { API_ENDPOINTS } from "./api-config";

// GET ALL USERS
export const getUsersApi = () => {
  return axios.get(API_ENDPOINTS.ADMIN.GETUSERS);
};