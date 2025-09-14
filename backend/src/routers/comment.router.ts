import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { CommentValidator } from "../validators/comment.validator";
import { commentMiddleware } from "../middlewares/comment.middleware";
import { commentController } from "../controllers/comment.controller";


const router = Router()

router.post(
    "/:orderId",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValid("orderId"),
    commentMiddleware.isComparedIdSame(),
    commonMiddleware.isBodyValid(CommentValidator.CreateComment),
    commentController.createComment
)

router.get(
    "/:commentId",
    authMiddleware.checkAccessToken,
    commentController.getById
)

export const commentRouter= router;
