import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";
import { BadRequestError } from "../utils/errors/app.error.js";

export const validateBody = (schema: ZodType) => {
    return (req: Request, _res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const details = (result.error as ZodError).issues.map((issue) => ({
                field: issue.path.join('.'),
                message: issue.message
            }));

            throw new BadRequestError('Validation failed', details);
        }

        req.body = result.data;
        next();
    };
};