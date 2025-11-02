
import { IRes } from "../types/responeType";
import { IOrderWithComments } from "../interfaces/IOrder";
import { apiService } from "./apiService";
import { urls } from "../constants/constants";

const orderService = {
    getAll: (query: string) : IRes<{data: IOrderWithComments[], total: number, limit: number, page: string}> => apiService.get(urls.orders.getAll(query))
}

export {
    orderService
};