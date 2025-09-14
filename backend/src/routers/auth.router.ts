import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { AuthValidator } from "../validators/auth.validator";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";

const router = Router();

router.post(
    "/sign-in",
    commonMiddleware.isBodyValid(AuthValidator.SignIn),
    userMiddleware.isUserActive(),
    authController.signIn,
);

router.post(
    "/refresh",
    authMiddleware.checkRefreshToken,
    authController.refresh,
);

router.get(
    "/me",
    authMiddleware.checkAccessToken,
    authController.getMe
)

router.delete(
    "/logout",
    authMiddleware.checkAccessToken,
    authController.logout
)

router.post(
    "/activate/:userId",
    authMiddleware.checkAccessToken,
    userMiddleware.isAdmin(),
    authController.getActivateLink
)

router.patch(
    "/activate/:actionToken",
    authMiddleware.checkActionToken(ActionTokenTypeEnum.ACTIVATE_ACCOUNT),
    commonMiddleware.isBodyValid(AuthValidator.CheckPassword),
    authController.activateAccount


)




export const authRouter = router;
