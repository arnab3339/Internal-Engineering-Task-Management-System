import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/helpers/jwt.helper.js";
import { UnauthorizedError } from "../utils/errors/app.error.js";

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            throw new UnauthorizedError("Please sign in first");
        }

        const payload = verifyToken(token);

        req.user = payload;

        next();
    } catch (error) {
        next(new UnauthorizedError("Session expired or invalid, please sign in again"));
    }
}