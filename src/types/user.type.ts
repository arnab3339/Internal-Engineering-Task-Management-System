import { JwtPayload } from "jsonwebtoken";
import { Role, User } from "../../generated/prisma/client.js";
export type SafeUser = Omit<User, "passwordHash">;
export type SafeUserWithRole = SafeUser & {
    role: Role;
};
export interface UserTokenPayload extends JwtPayload {
    id: string;
    email: string;
    roleId: string;
}