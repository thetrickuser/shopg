import axios from "axios";
import config from '../config/config.json';

const backendUrl = config.BACKEND_BASE_URL;

export const register = async (data) => {
  try {
    const response = await axios.post(`${backendUrl}/auth/signup`, data);
    return response;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return Promise.reject(err.response.data);
  }
};
