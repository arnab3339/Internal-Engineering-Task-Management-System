import { Role } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";
import { CreateRoleDto } from "../dtos/role.dto.js";
import { mapPrismaError } from "../utils/errors/prisma-error.mapper.js";

export interface IRoleRepository {
    create(data: CreateRoleDto): Promise<Role>;
    find(id: bigint): Promise<Role | null>;
}

export class RoleRepository implements IRoleRepository {
    async create(data: CreateRoleDto): Promise<Role> {
        try {
            return await prisma.role.create({
                data
            });
        } catch (error) {
            throw mapPrismaError(error);
        }
    }

    async find(id: bigint): Promise<Role | null> {
        return prisma.role.findUnique({
            where: { id }
        });
    }
}