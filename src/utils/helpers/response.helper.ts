import { Response } from "express";

interface SuccessPayload<T> {
    success: true;
    message: string;
    data: T;
}

export function sendSuccess<T>(res: Response, data: T, statusCode = 200, message: string) : void {
    const body: SuccessPayload<T> = {
        success: true,
        message,
        data,
    };

    res.status(statusCode).json(body);
} 