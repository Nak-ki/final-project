import axios from "axios";
import { baseURL } from "../constants/constants";
import { authService } from "./authService";


const apiService = axios.create({baseURL})

apiService.interceptors.request.use((requestObject) => {
    if (requestObject.method?.toUpperCase() === 'GET') {
        const accessToken = authService.getAccessToken();

        if (accessToken) {
            requestObject.headers.Authorization = `Bearer ${accessToken}`
        }
    }
    return requestObject
})

export {apiService}