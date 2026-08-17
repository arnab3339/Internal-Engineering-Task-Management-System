import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

import { JWT_SECRET, JWT_EXPIRES_IN } from "../../configs/server.config.js";
import { UserTokenPayload } from '../../types/user.type.js';

export function signToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET as Secret, {
        expiresIn: JWT_EXPIRES_IN
    } as jwt.SignOptions);
}

export function verifyToken(token: string): UserTokenPayload {
    return jwt.verify(token, JWT_SECRET as Secret) as UserTokenPayload;
}