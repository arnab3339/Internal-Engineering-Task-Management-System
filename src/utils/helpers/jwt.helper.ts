import jwt from 'jsonwebtoken';

import { JWT_SECRET, JWT_EXPIRES_IN } from "../../configs/server.config.js";

export interface JwtPayload {
    id: string;
    roleId: string;
}

export function signToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    } as jwt.SignOptions);
}

export function verifyToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
}