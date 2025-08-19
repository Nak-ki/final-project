
import {ITokenPair, ITokenPayload} from "../interfaces/token.interface";
import {
    ISignIn,
    IUser,
} from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";

import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import {ApiError} from "../errors/api.error";
import dayjs from "dayjs";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { config } from "../configs/configs";

class AuthService {

    public async signIn(
        dto: ISignIn,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        const user = await userRepository.getByEmail(dto.email);
        if (!user) {
            throw new ApiError("User not found", 404);
        }

        const isPasswordCorrect = await passwordService.comparePassword(
            dto.password,
            user.password,
        );
        if (!isPasswordCorrect) {
            throw new ApiError("Invalid credentials", 401);
        }

        await tokenRepository.deleteManyByUserId(user._id)

        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role,
        });
        await tokenRepository.create({
            ...tokens,
            _userId: user._id,
        });

        const last_login = dayjs().format('MMMM D, YYYY')
        const updateUser = await userRepository.updateLastLogin(user._id, last_login)

        return { user: updateUser, tokens };
    }


    public async refresh(
        payload: ITokenPayload,
        refreshToken: string,
    ): Promise<ITokenPair> {

        await tokenRepository.deleteOneByParams({ refreshToken });

        const tokens = tokenService.generateTokens({
            userId: payload.userId,
            role: payload.role,
        });

        await tokenRepository.create({
            ...tokens,
            _userId: payload.userId,
        });

        return tokens;
    }

    public async getActivateLink(id: string): Promise<string> {
        const user = await userRepository.getById(id);

        if (!user) {
            throw new ApiError("User not found", 404);
        }

        const token = tokenService.generateActionTokens(
            { userId: user._id, role: user.role },
            ActionTokenTypeEnum.ACTIVATE_ACCOUNT,
        );

        await actionTokenRepository.create({
            type: ActionTokenTypeEnum.ACTIVATE_ACCOUNT,
            _userId: user._id,
            token,
        });
        return `${config.FRONT_URL}/activate/${token}`

    }

    public async activateAccount(
        jwtPayload: ITokenPayload,
        password: string,
    ): Promise<void> {
        const hashPassword = await passwordService.hashPassword(password);
        await userRepository.updateById(jwtPayload.userId, { password: hashPassword, isActive: true});

        await actionTokenRepository.deleteManyByParams({
            _userId: jwtPayload.userId,
            type: ActionTokenTypeEnum.ACTIVATE_ACCOUNT,
        });
        await tokenRepository.deleteManyByParams({ _userId: jwtPayload.userId });
    }
}

export const authService = new AuthService();
