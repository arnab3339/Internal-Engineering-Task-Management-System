import { Role } from "../generated/prisma/client.js";
import { CreateRoleDto } from "../dto/role.dto.js";
import { prisma } from "../configs/db.config.js";

export interface IRoleRepository {
    create(data: CreateRoleDto): Promise<Role>;
    findAll(): Promise<Role[]>;
    findById(id: bigint): Promise<Role | null>;
}

export class RoleRepository implements IRoleRepository {
    async create(data: CreateRoleDto): Promise<Role> {
        return await prisma.role.create({
            data,
        });
    }

    async findAll(): Promise<Role[]> {
        return await prisma.role.findMany();
    }

    async findById(id: bigint): Promise<Role | null> {
        return await prisma.role.findUnique({
            where: { id },
        });
    }
}