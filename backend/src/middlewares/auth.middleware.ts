import { NextFunction, Request, Response } from "express";

import { TokenTypeEnum } from "../enums/token-type.enum";

import { tokenRepository } from "../repositories/token.repository";
import { tokenService } from "../services/token.service";
import {ApiError} from "../errors/api.error";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { ITokenPayload } from "../interfaces/token.interface";
import { actionTokenRepository } from "../repositories/action-token.repository";

class AuthMiddleware {
    public async checkAccessToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const header = req.headers.authorization;
            if (!header) {
                throw new ApiError("Token is not provided", 401);
            }
            const accessToken = header.split("Bearer ")[1];
            const payload = tokenService.verifyToken(
                accessToken,
                TokenTypeEnum.ACCESS,
            );

            const pair = await tokenRepository.findByParams({ accessToken });
            if (!pair) {
                throw new ApiError("Token is not valid", 401);
            }
            req.res.locals.tokenId = pair._id;
            req.res.locals.jwtPayload = payload;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const header = req.headers.authorization;
            if (!header) {
                throw new ApiError("Token is not provided", 401);
            }
            const refreshToken = header.split("Bearer ")[1];
            const payload = tokenService.verifyToken(
                refreshToken,
                TokenTypeEnum.REFRESH,
            );

            const pair = await tokenRepository.findByParams({ refreshToken });
            if (!pair) {
                throw new ApiError("Token is not valid", 401);
            }
            req.res.locals.jwtPayload = payload;
            req.res.locals.jwtTokens = refreshToken;

            next();
        } catch (e) {
            next(e);
        }
    }

    public checkActionToken(type: ActionTokenTypeEnum) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const token  = req.params.actionToken

                if (!token) {
                    throw new ApiError("Token is not provided", 401);
                }
                let payload: ITokenPayload;

                switch (type) {
                    case ActionTokenTypeEnum.ACTIVATE_ACCOUNT:
                        payload = tokenService.verifyToken(
                            token,
                            ActionTokenTypeEnum.ACTIVATE_ACCOUNT,
                        );
                        break;
                    case ActionTokenTypeEnum.RECOVERY_PASSWORD:
                        payload = tokenService.verifyToken(
                            token,
                            ActionTokenTypeEnum.RECOVERY_PASSWORD,
                        );
                        break;
                }

                const tokenEntity = await actionTokenRepository.getByToken(token);

                if (!tokenEntity) {
                    throw new ApiError("Token is not valid", 401);
                }

                req.res.locals.jwtPayload = payload;
                next();
            } catch (e) {
                next(e);
            }
        };
    }

}
export const authMiddleware = new AuthMiddleware();