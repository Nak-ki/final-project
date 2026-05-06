
import { IRes } from "../types/responeType";
import { apiService } from "./apiService";
import { urls } from "../constants/constants";
import { IUserRes } from "../interfaces/IUser";


const userService = {
    getAll: (query: string) : IRes<{data: IUserRes[], total: number, limit: number, page: string}> => apiService.get(urls.users.getAll(query)),

    create: (data: {email: string, name: string, surname: string}): IRes<void> => apiService.post(urls.users.create, data),

}

export {
    userService
};