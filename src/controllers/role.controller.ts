import { Request, Response } from "express";
import { RoleService } from "../services/role.service.js";

export class RoleController {
    constructor(
        private readonly roleService: RoleService
    ) {}

    async createRoleHandler(req: Request, res: Response) {
        const role = await this.roleService.createRole(req.body);

        return res.status(201).json({
            success: true,
            message: "Role created successfully",
            data: {
                ...role,
                id: role.id.toString()
            }
        });
    }

    async getRolesHandler(_req: Request, res: Response) {
        const roles = await this.roleService.getRoles();

        return res.status(200).json({
            success: true,
            message: "Roles fetched successfully",
            data: roles.map((role) => ({
                ...role,
                id: role.id.toString()
            }))
        });
    }

    async getRoleHandler(req: Request, res: Response) {
        const id = BigInt(req.params.id);

        const role = await this.roleService.getRoleById(id);

        return res.status(200).json({
            success: true,
            message: "Role fetched successfully",
            data: role
                ? {
                    ...role,
                    id: role.id.toString()
                }
                : null
        });
    }
}