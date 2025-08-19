import { Router } from "express";
import { orderController } from "../controllers/order.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { OrderValidator } from "../validators/order.validator";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router()

router.get("/",
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(OrderValidator.OrderQuery),
    orderController.getOrders
)

export const orderRouter = router;
