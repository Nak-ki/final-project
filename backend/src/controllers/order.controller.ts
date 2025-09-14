import { NextFunction, Request, Response } from "express";
import { orderService } from "../services/order.service";
import { IOrderQuery } from "../interfaces/order-query.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUpdateOrder } from "../interfaces/order.interface";



class OrderController {
    public async getOrders(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(1);
            const query = req.query as unknown as IOrderQuery;
            const result = await orderService.getOrders(query);
            res.json(result).status(201);
        } catch (e) {
            next(e);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.orderId
            const result = await orderService.getById(id);
            res.json(result).status(200);
        } catch (e) {
            next(e);
        }
    }

    public async updateOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.orderId
            const payload = req.res.locals.jwtPayload as ITokenPayload
            const dto = req.body as IUpdateOrder
            const result = await orderService.updateOrder(id, payload.userId, dto );
            res.json(result).status(200);
        } catch (e) {
            next(e);
        }
    }

}

export const orderController = new OrderController();