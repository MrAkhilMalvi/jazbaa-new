import { API_ENDPOINTS } from "@/providers/api-config";
import axios from "@/providers/axios";

export const getUsersApi = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.ADMIN.GETUSERS);
    return response;
  } catch (error) {
    console.error("Get Me API Error:", error);
    throw error;
  }
};