import { Role, Prisma } from "../../generated/prisma/client.js";
import { IRoleRepository } from "../repositories/role.repository.js";
import { CreateRoleDto } from "../dtos/role.dto.js";
import { BadRequestError, ConflictError } from "../utils/errors/app.error.js";

export interface IRoleService {
    createRole(data: CreateRoleDto): Promise<Role>;
    findRoleById(id: bigint): Promise<Role | null>;
    findRoleByName(name: string): Promise<Role | null>;
}

export class RoleService implements IRoleService {
    private readonly roleRepository: IRoleRepository;

    constructor(roleRepository: IRoleRepository) {
        this.roleRepository = roleRepository;
    }

    async createRole(data: CreateRoleDto): Promise<Role> {
        try {
            return await this.roleRepository.create(data);
        } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError && error.code == 'P2002') {
                throw new ConflictError('A record with this value already exists', { fields: error.meta?.target });
            }

            throw error;
        }
    }

    async findRoleById(id: bigint): Promise<Role | null> {
        const role: Role | null = await this.roleRepository.find(id);

        if(!role) {
            throw new BadRequestError('This is role is not exist');
        }

        return role;
    }

    async findRoleByName(name: string): Promise<Role | null> {
        const role: Role | null = await this.roleRepository.findByName(name);

        if(!role) {
            throw new BadRequestError('This is role is not exist');
        }

        return role;
    }
}