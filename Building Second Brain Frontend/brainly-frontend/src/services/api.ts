import axios from "axios"
import { BACKEND_URL } from "../config"
console.log(BACKEND_URL);

export const axiosInstance = axios.create({
    baseURL:BACKEND_URL,
    withCredentials:true
})