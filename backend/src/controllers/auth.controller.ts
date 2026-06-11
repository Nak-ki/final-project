import {NextFunction , Request, Response } from "express";
import {ISignIn} from "../interfaces/user.interface";
import {authService} from "../services/auth.service";
import {ITokenPayload} from "../interfaces/token.interface";


class AuthController {

    public async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as ISignIn;
            const result = await authService.signIn(dto);
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.res.locals.jwtPayload as ITokenPayload;
            const token = req.res.locals.jwtTokens as string;
            const result = await authService.refresh(payload, token);
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async getActivateLink(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const id = req.params.userId
            const result = await authService.getActivateLink(id)
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async activateAccount(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const payload = req.res.locals.jwtPayload as ITokenPayload
            const dto = req.body as {password: string, confirm_password: string}
            await authService.activateAccount(payload, dto.password)
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    public async getMe(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.res.locals.jwtPayload as ITokenPayload
            const result = await authService.getMe(payload);
            res.json(result).status(200);
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.res.locals.jwtPayload as ITokenPayload
            await authService.logout(payload);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    public async banUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            await authService.banUser(userId);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    public async unbanUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            await authService.unbanUser(userId);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }



    public async getRecoveryPasswordLink(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const id = req.params.userId
            const result = await authService.getRecoveryPasswordLink(id)
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async recoveryPassword(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const payload = req.res.locals.jwtPayload as ITokenPayload
            const dto = req.body as {password: string}
            await authService.recoveryPassword(payload, dto.password)
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

}

    export const authController = new AuthController();