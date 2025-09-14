import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { GroupValidator } from "../validators/group.validator";
import { groupController } from "../controllers/group.controller";

const router = Router()

router.get("/",
    authMiddleware.checkAccessToken,
    groupController.getGroups
)

router.post(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(GroupValidator.GroupDTO),
    groupController.createGroup

)

export const groupRouter = router;
