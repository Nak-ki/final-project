import { Router } from "express";
import { orderController } from "../controllers/order.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { OrderValidator } from "../validators/order.validator";
import { authMiddleware } from "../middlewares/auth.middleware";
import { orderMiddleware } from "../middlewares/order.middleware";

const router = Router()

router.get("/",
    authMiddleware.checkAccessToken,
    commonMiddleware.isQueryValid(OrderValidator.OrderQuery),
    orderController.getOrders
)

router.put(
    "/:orderId",
    authMiddleware.checkAccessToken,
    orderMiddleware.isOrderIsFreeOrInProgress,
    commonMiddleware.isIdValid("orderId"),
    commonMiddleware.isBodyValid(OrderValidator.OrderBody),
    orderController.updateOrder

)

router.get("/:orderId",
    authMiddleware.checkAccessToken,
    orderController.getById
)

export const orderRouter = router;
