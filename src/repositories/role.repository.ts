import { Role, Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";
import { CreateRoleDto } from "../dtos/role.dto.js";

export interface IRoleRepository {
    create(data: CreateRoleDto): Promise<Role>;
    find(id: bigint): Promise<Role | null>;
    findByName(name: string): Promise<Role | null>
}

export class RoleRepository implements IRoleRepository {
    async create(data: Prisma.RoleCreateInput): Promise<Role> {
        return await prisma.role.create({
            data
        });
    }

    async find(id: bigint): Promise<Role | null> {
        return prisma.role.findUnique({
            where: { id }
        });
    }

    async findByName(name: string): Promise<Role | null> {
        return prisma.role.findUnique({
            where: {
                name
            }
        });
    }
}