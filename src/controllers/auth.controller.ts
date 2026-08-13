import { Request, Response, NextFunction } from "express";
import { IAuthService } from "../services/auth.service.js";
import { NotimplementedError } from "../utils/errors/app.error.js";

export class AuthController {
    private readonly authService: IAuthService;

    constructor(authService: IAuthService) {
        this.authService = authService;
    }

    async signupHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new NotimplementedError('Signup Handler is not implemented');
    }

    async signinHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new NotimplementedError('Signin Handler is not implemented');
    }
}