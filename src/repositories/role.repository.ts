import { Role } from "../generated/prisma/client.js";
import { ICreateRoleDto } from "../dto/role.dto.js";
import { prisma } from "../configs/db.config.js";

export interface IRoleRepository {
    create(data: ICreateRoleDto): Promise<Role>;
    find(): Promise<Role[]>;
    findById(id: bigint): Promise<Role | null>;
}

export class RoleRepository implements IRoleRepository {

    async create(data: ICreateRoleDto): Promise<Role> {
        return prisma.role.create({
            data
        });
    }

    async find(): Promise<Role[]> {
        return prisma.role.findMany();
    }

    async findById(id: bigint): Promise<Role | null> {
        return prisma.role.findUnique({
            where: { id }
        });
    }
}