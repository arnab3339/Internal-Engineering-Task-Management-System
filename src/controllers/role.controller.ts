import { Request, Response, NextFunction } from "express";
import { RoleService } from "../services/role.service.js";

export class RoleController {
    private readonly roleService: RoleService;

    constructor(roleService: RoleService) {
        this.roleService = roleService;
    }

    async createRoleHandler(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const role = await this.roleService.createRole(req.body);

            res.status(201).json({
                success: true,
                message: "Role created successfully",
                data: {
                    ...role,
                    id: role.id.toString(),
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async getRolesHandler(
        _req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const roles = await this.roleService.getRoles();

            res.status(200).json({
                success: true,
                message: "Roles fetched successfully",
                data: roles.map((role) => ({
                    ...role,
                    id: role.id.toString(),
                })),
            });
        } catch (error) {
            next(error);
        }
    }

    async getRoleHandler(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const id = BigInt(req.params.id);

            const role = await this.roleService.getRoleById(id);

            res.status(200).json({
                success: true,
                message: "Role fetched successfully",
                data: {
                    ...role,
                    id: role.id.toString(),
                },
            });
        } catch (error) {
            next(error);
        }
    }
}