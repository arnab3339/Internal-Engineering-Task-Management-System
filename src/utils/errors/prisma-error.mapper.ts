import { Prisma } from "../../../generated/prisma/client.js";
import { AppError, ConflictError, InternalServerError } from "./app.error.js";

export function mapPrismaError(error: unknown): AppError {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002':
                return new ConflictError('A record with this value already exists', {
                    fields: error.meta?.target
                });
            default:
                return new InternalServerError('Database error occurred');
        }
    }

    return new InternalServerError('Something went wrong');
}