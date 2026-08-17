import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/errors/app.error.js";
import { verifyToken } from "../utils/helpers/jwt.helper.js";

export function authMiddleware(
    req: Request,
    _res: Response,
    next: NextFunction
): void {
    const token = req.cookies?.accessToken;

    if (!token) {
        throw new UnauthorizedError("Authentication required");
    }

    const payload = verifyToken(token);

    req.user = payload;

    next();
}