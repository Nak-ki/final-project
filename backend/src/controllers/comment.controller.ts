import { NextFunction, Request, Response } from "express";
import { ITokenPayload } from "../interfaces/token.interface";
import { commentService } from "../services/comment.service";


class CommentController {
    public async createComment(req: Request, res: Response, next: NextFunction) {
        try {
            const orderId = req.params.orderId;
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

            const body = req.body as {body: string};
            const result = await commentService.createComment( orderId, jwtPayload, body);
            res.json(result).status(201);
        } catch (e) {
            next(e);
        }
    }
    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.commentId
            const result = await commentService.getById(id);
            res.json(result).status(200);
        } catch (e) {
            next(e);
        }
    }
}

export const commentController = new CommentController();