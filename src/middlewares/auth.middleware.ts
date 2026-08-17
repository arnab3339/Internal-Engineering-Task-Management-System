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
        const authorization = req.headers.authorization;

        if (!authorization) {
            throw new UnauthorizedError("Authorization token is required");
        }

        const parts = authorization.split(" ");

        if (parts.length !== 2 || parts[0] !== "Bearer") {
            throw new UnauthorizedError("Invalid authorization format");
        }

        const token = parts[1];

        if (!token) {
            throw new UnauthorizedError("Authorization token is required");
        }

        const payload = verifyToken(token);

        req.user = payload;

        next();
    } catch (error) {
        next(error);
    }
}