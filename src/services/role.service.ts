import { Role } from "../../generated/prisma/client.js";
import { IRoleRepository } from "../repositories/role.repository.js";
import { CreateRoleDto } from "../dtos/role.dto.js";

export interface IRoleService {
    create(data: CreateRoleDto): Promise<Role>;
    find(id: bigint): Promise<Role | null>;
}

export class RoleService implements IRoleService {
    private readonly roleRepository: IRoleRepository;

    constructor(roleRepository: IRoleRepository) {
        this.roleRepository = roleRepository;
    }

    async create(data: CreateRoleDto): Promise<Role> {
        return this.roleRepository.create(data);
    }

    async find(id: bigint): Promise<Role | null> {
        return this.roleRepository.find(id);
    }
}