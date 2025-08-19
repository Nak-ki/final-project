import { IOrderQuery } from "../interfaces/order-query.interface";
import { IOrderWithComments } from "../interfaces/order.interface";
import { orderRepository } from "../repositories/order.repository";


class OrderService{
    public async getOrders(query: IOrderQuery): Promise<{data: IOrderWithComments[], total: number, limit: number}> {

        const [entities, total, limit] = await orderRepository.getAll(query)
        return {data: entities, total, limit};
    }

}

export const orderService = new OrderService();