import { NextFunction, Request, Response } from "express";
import { ICreateManager } from "../interfaces/user.interface";
import { userService } from "../services/user.service";
import { IUserQuery } from "../interfaces/user-query.interface";


class UserController {
    public async createManager(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as ICreateManager
            const result = await userService.createManager(dto);
            res.json(result).status(201);
        } catch (e) {
            next(e);
        }
    }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query as unknown as IUserQuery ;
            const result = await userService.getAll(query);
            res.json(result).status(201);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();