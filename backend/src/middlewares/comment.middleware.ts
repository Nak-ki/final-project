import { NextFunction, Request, Response } from "express";
import { ITokenPayload } from "../interfaces/token.interface";
import { orderRepository } from "../repositories/order.repository";
import { ApiError } from "../errors/api.error";



class CommentMiddleware {
    public isComparedIdSame() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const orderId = req.params.orderId
                const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

                const order = await orderRepository.getById(orderId);

                if (!order) {
                    throw new ApiError("Order not found", 404)
                }

                if (order._userId){
                    if (order._userId.toString() !== jwtPayload.userId) {
                        throw new ApiError("Forbidden", 403)
                    }
                }

                next();
            } catch (e) {
                next(e);
            }
        }

    }
}


export const commentMiddleware  = new CommentMiddleware();