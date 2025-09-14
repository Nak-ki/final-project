
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validators/user.validator";
import { userController } from "../controllers/user.controller";

const router = Router()

router.post("/",
    authMiddleware.checkAccessToken,
    userMiddleware.isAdmin(),
    commonMiddleware.isBodyValid(UserValidator.createUser),
    userMiddleware.isUserExist(),
    userController.createManager
)

router.get(
    "/",
    authMiddleware.checkAccessToken,
    userMiddleware.isAdmin(),
    userController.getAll
)

router.get(
    "/:userId",
    authMiddleware.checkAccessToken,
    userMiddleware.isAdmin(),
    userController.getById
)

export const userRouter = router;