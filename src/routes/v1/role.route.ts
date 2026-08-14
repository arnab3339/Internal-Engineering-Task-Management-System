import { Router } from "express";
import { RoleController } from "../../controllers/role.controller.js";
import { RoleService } from "../../services/role.service.js";
import { createRoleSchema } from "../../dto/role.dto.js";
import { validate } from "../../middlewares/validation.middleware.js";

const roleRouter = Router();

const roleService = new RoleService();
const roleController = new RoleController(roleService);

roleRouter.post(
    "/",
    validate(createRoleSchema),
    roleController.createRoleHandler.bind(roleController)
);

roleRouter.get(
    "/",
    roleController.getRolesHandler.bind(roleController)
);

roleRouter.get(
    "/:id",
    roleController.getRoleHandler.bind(roleController)
);

export default roleRouter;