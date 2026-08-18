import { Prisma, Role, User } from "../../generated/prisma/client.js";

export type SafeUser = Omit<User, "passwordHash">;

export type SafeUserWithRole = SafeUser & {
    role: Role;
};

export interface AuthUser {
    userId: bigint;
    role: string;
}

export type UserWithRole = Prisma.UserGetPayload<{
    include: {
        role: true
    }
}>