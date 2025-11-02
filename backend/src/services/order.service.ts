import { IOrderQuery } from "../interfaces/order-query.interface";
import { IOrder, IOrderWithComments, IUpdateOrder } from "../interfaces/order.interface";
import { orderRepository } from "../repositories/order.repository";
import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";
import { groupRepository } from "../repositories/group.repository";
import { OrderStatusEnum } from "../enums/order-status.enum";


class OrderService{
    public async getOrders(query: IOrderQuery): Promise<{data: IOrderWithComments[], total: number, limit: number, page: string}> {

        const [entities, total, limit] = await orderRepository.getAll(query)
        return {data: entities, total, limit, page: query.page};
    }

    public async getById(orderId: string): Promise<IOrder> {
        return await orderRepository.getById(orderId);
    }

    public async updateOrder(orderId: string, userId: string, dto: IUpdateOrder): Promise<IOrder> {
        const order = await orderRepository.getById(orderId)
        const user = await userRepository.getById(userId)
        const group = await groupRepository.getByName({name: dto.group})

        if (dto.group && !group) {
            throw new ApiError("Group is not exist", 404)
        }

        if (!order) {
            throw new ApiError("Order is not exist", 404)
        }

        if (dto.status === OrderStatusEnum.NEW) {
            console.log("n")
            return await orderRepository.updateOrder({...dto, _id: order._id, manager: null, _userId: null});
        } else {
            console.log("i")
            return await orderRepository.updateOrder({...dto, _id: order._id, manager: user.name, _userId: user._id});
        }


    }

}

export const orderService = new OrderService();