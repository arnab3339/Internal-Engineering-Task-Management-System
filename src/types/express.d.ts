import { Request } from "express";

import { AuthUser } from "./auth.type.ts";

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}

export interface AuthenticatedRequest extends Request {
    user: AuthUser
}