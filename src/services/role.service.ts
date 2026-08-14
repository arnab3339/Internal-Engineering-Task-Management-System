import { ICreateRoleDto } from "../dto/role.dto.js";
import { RoleRepository } from "../repositories/role.repository.js";

export class RoleService {
    private readonly roleRepository: RoleRepository;

    constructor() {
        this.roleRepository = new RoleRepository();
    }

    async createRole(data: ICreateRoleDto) {
        return await this.roleRepository.create(data);
    }

    async getRoles() {
        return await this.roleRepository.find();
    }

    async getRoleById(id: bigint) {
        return await this.roleRepository.findById(id);
    }
}