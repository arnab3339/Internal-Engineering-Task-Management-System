import { Request, Response, NextFunction } from "express";

import { RoleName } from "../types/role.type.js";
import { AuthenticatedRequest } from "../types/express.js";
import { UnauthorizedError } from "../utils/errors/app.error.js";

export const authorizeUser = (...allowedRoles: RoleName[]) => (req: Request, _res: Response, next: NextFunction) => {
    try {
        const { user } = req as AuthenticatedRequest;
        
        //console.log("DEBUG authorizeUser:", { userRole: user.role, allowedRoles });

        if(!allowedRoles.includes(user.role as RoleName)) {
            throw new UnauthorizedError('You are not authorized to use this feature');
        }

        next();
    } catch (error) {
        next(error);
    }
}