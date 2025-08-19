import jsonwebtoken from "jsonwebtoken";

import { config } from "../configs/configs";

import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import {TokenTypeEnum} from "../enums/token-type.enum";
import {ActionTokenTypeEnum} from "../enums/action-token-type.enum";
import {ApiError} from "../errors/api.error";

class TokenService {
    public generateTokens(payload: ITokenPayload): ITokenPair {
        const accessToken = jsonwebtoken.sign(payload, config.JWT_ACCESS_SECRET, {
            expiresIn: config.JWT_ACCESS_LIFETIME,
        });
        const refreshToken = jsonwebtoken.sign(
            payload,
            config.JWT_REFRESH_SECRET,
            { expiresIn: config.JWT_REFRESH_LIFETIME },
        );
        return { accessToken, refreshToken };
    }

    public verifyToken(
        token: string,
        type: TokenTypeEnum | ActionTokenTypeEnum,
    ): ITokenPayload {
        try {
            let secret: string;

            switch (type) {
                case TokenTypeEnum.ACCESS:
                    secret = config.JWT_ACCESS_SECRET;
                    break;

                case TokenTypeEnum.REFRESH:
                    secret = config.JWT_REFRESH_SECRET;
                    break;

                case ActionTokenTypeEnum.RECOVERY_PASSWORD:
                    secret = config.JWT_RECOVERY_SECRET;
                    break;

                case ActionTokenTypeEnum.ACTIVATE_ACCOUNT:
                    secret = config.JWT_ACTIVE_SECRET;
                    break;

                default:
                    throw new ApiError("Invalid token type", 400);
            }

            return jsonwebtoken.verify(token, secret) as ITokenPayload;
        } catch (e) {
            console.error(e.message);
            throw new ApiError("Invalid token", 401);
        }
    }

    public generateActionTokens(
        payload: ITokenPayload,
        tokenType: ActionTokenTypeEnum,
    ): string {
        let secret: string;
        let expiresIn: any;

        switch (tokenType) {
            case ActionTokenTypeEnum.ACTIVATE_ACCOUNT:
                secret = config.JWT_ACTIVE_SECRET;
                expiresIn = config.JWT_ACTIVE_LIFETIME;
                break;
            case ActionTokenTypeEnum.RECOVERY_PASSWORD:
                secret = config.JWT_RECOVERY_SECRET;
                expiresIn = config.JWT_RECOVERY_LIFETIME;
                break;
            default:
                throw new ApiError("Invalid token type", 400);
        }
        return jsonwebtoken.sign(payload, secret, { expiresIn });
    }
}

export const tokenService = new TokenService();
