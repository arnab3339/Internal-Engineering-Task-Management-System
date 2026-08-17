import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { IRoleService } from "../services/role.service.js";
import { CreateRoleDto } from "../dtos/role.dto.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";

export class RoleController {
    private readonly roleService: IRoleService;

    constructor(roleService: IRoleService) {
        this.roleService = roleService;
    }

    async createRoleHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = req.body as CreateRoleDto;

            const role = await this.roleService.createRole(data);

            sendSuccess(res, role, StatusCodes.CREATED, 'Role created successfully');
        } catch (error) {
            next(error);
        }
    };
}