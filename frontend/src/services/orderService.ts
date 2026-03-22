
import { IRes } from "../types/responeType";
import { IOrderWithComments } from "../interfaces/IOrder";
import { apiService } from "./apiService";
import { urls } from "../constants/constants";


const orderService = {
    getAll: (query: string) : IRes<{data: IOrderWithComments[], total: number, limit: number, page: string}> => apiService.get(urls.orders.getAll(query)),

    update: (id: string, body: {group:string, status:string, name:string, sum:number, surname:string,  alreadyPaid: number, email: string, course: string, phone: string, course_format: string, age: number, course_type: string}): IRes<void> => apiService.put(urls.orders.update(id), body),
    
    downloadExcel: (query: string) : IRes<Blob> => apiService.get(urls.orders.downloadExcel(query), {responseType: "blob"})
}

export {
    orderService
};