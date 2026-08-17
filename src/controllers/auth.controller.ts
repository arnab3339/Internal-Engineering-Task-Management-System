import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { IAuthService } from "../services/auth.service.js";
import { SignInDto } from "../dtos/auth.dto.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";
import {COOKIE_MAX_AGE,COOKIE_SECURE,COOKIE_SAME_SITE,} from "../configs/server.config.js";

export class AuthController {
    private readonly authService: IAuthService;

    constructor(authService: IAuthService) {
        this.authService = authService;
    }

    async signInHandler(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const data = req.body as SignInDto;

            const token = await this.authService.signIn(data);

            res.cookie("accessToken", token, {
                httpOnly: true,
                secure: COOKIE_SECURE,
                sameSite: COOKIE_SAME_SITE,
                maxAge: COOKIE_MAX_AGE,
            });

            sendSuccess(
                res,
                null,
                StatusCodes.OK,
                "Signed in successfully"
            );
        } catch (error) {
            next(error);
        }
    }

    async getCurrentUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const user = await this.authService.getCurrentUser(req.user!);

            sendSuccess(
                res,
                user,
                StatusCodes.OK,
                "Current user fetched successfully"
            );
        } catch (error) {
            next(error);
        }
    }
}