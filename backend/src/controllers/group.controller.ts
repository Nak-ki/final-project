import { NextFunction, Request, Response } from "express";
import { ICreateGroup } from "../interfaces/group.interface";
import { groupService } from "../services/group.service";



class GroupController {
    public async getGroups(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await groupService.getGroups();
            res.json(result).status(201);
        } catch (e) {
            next(e);
        }
    }


    public async createGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as ICreateGroup
            const result = await groupService.createGroup(dto);
            res.json(result).status(200);
        } catch (e) {
            next(e);
        }
    }

}

export const groupController = new GroupController();