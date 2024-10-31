import axios from 'axios';
import { API_CONFIG} from "../config/api";

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor (useful for adding auth tokens later)
axiosInstance.interceptors.request.use(
    (config) => {
        // Do something before request is sent, like adding a jwt token
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Do something with response data, like logging it
        console.log(response);
        return response;
    },
    (error) => {
        // Do something with response error, like logging it
        console.error('Error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;