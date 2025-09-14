import { NextFunction, Request, Response } from "express";
import { ITokenPayload } from "../interfaces/token.interface";
import { orderRepository } from "../repositories/order.repository";
import { userRepository } from "../repositories/user.repository";
import { ApiError } from "../errors/api.error";


class OrderMiddleware {
    public async isOrderIsFreeOrInProgress(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const id = req.params.orderId
            const payload = req.res.locals.jwtPayload as ITokenPayload
            const order = await orderRepository.getById(id)
            const user = await  userRepository.getById(payload.userId)

            if (order._userId && order._userId.toString() !== user._id.toString()) {
                throw new ApiError("Order is already occupied", 403)
            }

            next();
        } catch (e) {
            next(e);
        }
    }

}
export const orderMiddleware = new OrderMiddleware();