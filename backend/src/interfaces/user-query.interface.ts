import { OrderListEnum } from "../enums/order-list.enum";

export interface IOrderQuery{
    page: number,
    order: OrderListEnum,
}