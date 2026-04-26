import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_SERVER_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    
})