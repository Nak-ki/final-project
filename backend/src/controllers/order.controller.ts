import { NextFunction, Request, Response } from "express";
import { orderService } from "../services/order.service";
import { IOrderQuery } from "../interfaces/order-query.interface";


class OrderController {
    public async getOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query as unknown as IOrderQuery;
           const result = await orderService.getOrders(query);
            res.json(result).status(201);
        } catch (e) {
            next(e);
        }
    }
}

export const orderController = new OrderController();