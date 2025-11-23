import axios, { AxiosError } from "axios";
import { baseURL, urls } from "../constants/constants";
import { authService } from "./authService";
import { router } from "../routers/router";

type IWaiteList = () => void

let isRefreshing = false
const waitList:IWaiteList[] = []
let processRefresh = false

const apiService = axios.create({baseURL})

apiService.interceptors.request.use(requestObject => {

    const accessToken = authService.getAccessToken();
    const refreshToken = authService.getRefreshToken();
    processRefresh = !!refreshToken;


    if (accessToken && requestObject.url !== urls.auth.refresh) {
        requestObject.headers.Authorization = `Bearer ${accessToken}`
    } else {
        requestObject.headers.Authorization = `Bearer ${refreshToken}`
    }

    return requestObject
})


apiService.interceptors.response.use(
    res => res,
    async (error: AxiosError)=> {
        const originalRequest = error.config

        if (error.response.status === 401 && processRefresh) {
            if (!isRefreshing) {
                isRefreshing = true

                try {
                    await authService.refresh()
                    isRefreshing = false
                    runAfterRefresh()
                    return apiService(originalRequest)
                }
                catch (e) {
                    authService.deleteTokens()
                    isRefreshing = false
                    await router.navigate("/login?session_expired=true")
                    return Promise.reject(error)
                }
            }
            if (originalRequest.url === urls.auth.refresh) {
                return Promise.reject(error)
            }

            return new Promise(resolve => {
                subscribeToWaitList(() => {
                    resolve(apiService(originalRequest))
                })
            })

        }
        return Promise.reject(error)
    }
)
const subscribeToWaitList = (cb: IWaiteList): void => {
    waitList.push(cb)
}

const runAfterRefresh = ():void => {
    while (waitList.length) {
        const cb = waitList.pop()
        cb()
    }

}

export {apiService}