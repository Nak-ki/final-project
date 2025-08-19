import { Router } from "express";

import { authRouter } from "./auth.router";
import { orderRouter } from "./order.router";
import { commentRouter } from "./comment.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/orders", orderRouter);
router.use("/comments", commentRouter);


export const apiRouter = router;