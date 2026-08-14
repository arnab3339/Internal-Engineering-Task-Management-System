import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";
import { BadRequestError } from "../utils/errors/app.error.js";

export const validateBody =
  (schema: ZodType) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsedData = await schema.parse(req.body);

      req.body = parsedData;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedError: Record<string, string>[] = error.issues.map(
          (issue) => ({
            message: issue.message,
            field: issue.path.join("."),
          })
        );

        const message =
          formattedError[0]?.message || "Validation failed";

        next(new BadRequestError(message, formattedError));
        return;
      }

      next(error);
    }
  };