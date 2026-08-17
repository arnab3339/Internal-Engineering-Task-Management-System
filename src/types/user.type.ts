import { JwtPayload } from "jsonwebtoken";
import { User } from "../../generated/prisma/client.js";

export type SafeUser = Omit<User, "passwordHash">;

export interface UserTokenPayload extends JwtPayload {
    id: string;
    email: string;
    roleId: string;
}