import { CreateRoleDto } from "../dto/role.dto.js";
import { RoleRepository } from "../repositories/role.repository.js";
import { AppError } from "../utils/errors/app.error.js";

export class RoleService {
    private readonly roleRepository: RoleRepository;

    constructor() {
        this.roleRepository = new RoleRepository();
    }

    async createRole(data: CreateRoleDto) {
        try {
            return await this.roleRepository.create(data);
        } catch (error) {
            if (
                error instanceof Error &&
                "code" in error &&
                error.code === "P2002"
            ) {
                throw new AppError(
                    "A record with this value already exists",
                    409
                );
            }

            throw error;
        }
    }

    async getRoles() {
        return await this.roleRepository.findAll();
    }

    async getRoleById(id: bigint) {
        const role = await this.roleRepository.findById(id);

        if (!role) {
            throw new AppError(
                "Role not found",
                404
            );
        }

        return role;
    }
}