import { apiService } from "./apiService";
import { urls } from "../constants/constants";
import { IRes } from "../types/responeType";
import { ISignIn } from "../interfaces/ISignIn";
import { ITokenPair } from "../interfaces/ITokenPair";
import { IUser } from "../interfaces/IUser";
import { IUserWithTokens } from "../interfaces/IUserWithTokens";

const accessTokenKey = "access"
const refreshTokenKey = "refresh"

const authService = {
    async login(loginDto:ISignIn): Promise<IUser> {
        const {data} = await apiService.post(urls.auth.login, loginDto);
        const {user, tokens} = data as IUserWithTokens
        this.setTokens(tokens);
        return user
    },

    me(): IRes<IUser> {
        return apiService.get(urls.auth.me)
    },

    async refresh(): Promise<void> {
        const refresh = this.getRefreshToken();
        const {data} = await apiService.post(urls.auth.refresh, {refresh});
        this.setTokens(data)
    },

    setTokens({accessToken, refreshToken}: ITokenPair): void {
        localStorage.setItem(accessTokenKey, accessToken)
        localStorage.setItem(refreshTokenKey, refreshToken)
    },

    getAccessToken(): string {
        return localStorage.getItem(accessTokenKey)
    },

    getRefreshToken(): string {
        return localStorage.getItem(refreshTokenKey)
    },

    deleteTokens(): void {
        localStorage.removeItem(accessTokenKey)
        localStorage.removeItem(refreshTokenKey)
    }
}

export {
    authService
}