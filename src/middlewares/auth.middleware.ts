import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/errors/app.error.js";
import { verifyToken } from "../utils/helpers/jwt.helper.js";
import { UserTokenPayload } from "../types/user.type.js";

declare global {
    namespace Express {
        interface Request {
            user?: UserTokenPayload;
        }
    }
}

export function authenticate(
    req: Request,
    _res: Response,
    next: NextFunction
): void {
    try {
        const token = req.cookies?.accessToken;

        if (!token) {
            throw new UnauthorizedError("Authentication token is required");
        }

        const payload = verifyToken(token);

        req.user = payload;

        next();
    } catch (error) {
        next(error);
    }
}