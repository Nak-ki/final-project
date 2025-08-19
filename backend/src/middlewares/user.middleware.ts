import { NextFunction, Request, Response } from "express";
import { ITokenPayload } from "../interfaces/token.interface";
import { RoleEnum } from "../enums/role.enum";
import { ApiError } from "../errors/api.error";
import { ICreateManager, ISignIn } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";


class UserMiddleware{
    public  isAdmin() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

                if (jwtPayload.role !== RoleEnum.ADMIN){
                    throw new ApiError("Forbidden", 403)
                }
                next();
            } catch (e) {
                next(e);
            }
        }

    }

    public isUserExist() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const dto = req.body as ICreateManager;
                const user = await userRepository.getByEmail(dto.email)

                if (user) {
                    throw new ApiError("Manager is exist", 409)
                }

                next();
            } catch (e) {
                next(e);
            }
        }
    }


    public isUserActive() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const dto = req.body as ISignIn
                const user = await userRepository.getByEmail(dto.email)

                if (!user.isActive) {
                    throw new ApiError("Manager is not active", 401)
                }

                next();
            } catch (e) {
                next(e);
            }
        }
    }
}

export const  userMiddleware  = new UserMiddleware();