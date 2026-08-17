import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { IAuthService } from "../services/auth.service.js";
import { SignInDto } from "../dtos/auth.dto.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";

export class AuthController {
    private readonly authService: IAuthService;

    constructor(authService: IAuthService) {
        this.authService = authService;

        this.signInHandler = this.signInHandler.bind(this);
    }

    async signInHandler(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const data = req.body as SignInDto;

            const result = await this.authService.signIn(data);

            res.cookie("token", result, {
                httpOnly: true,
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
}