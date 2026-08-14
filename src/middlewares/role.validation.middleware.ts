import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { createRoleSchema } from "../dto/role.validation.js";

export const validateCreateRole = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        req.body = createRoleSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(422).json({
                success: false,
                message: "Validation failed",
                errors: error.issues,
            });
            return;
        }

        next(error);
    }
};