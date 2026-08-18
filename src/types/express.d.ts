import { Request } from "express";

import { AuthUser } from "./auth.type.js";

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