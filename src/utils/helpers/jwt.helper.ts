import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

import { JWT_SECRET, JWT_EXPIRES_IN } from "../../configs/server.config.js";

export interface AccessTokenClaims extends JwtPayload {
    userId: string;
    role: string;
}

export function signToken(payload: AccessTokenClaims): string {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
}

export function verifyToken(token: string): AccessTokenClaims {
    return jwt.verify(token, JWT_SECRET as Secret) as AccessTokenClaims;
}