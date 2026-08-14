import { Router } from "express";
import { RoleController } from "../../controllers/role.controller.js";
import { RoleService } from "../../services/role.service.js";
import { RoleRepository } from "../../repositories/role.repository.js";
import { validateBody } from "../../middlewares/validate.middleware.js";
import { createRoleSchema } from "../../dtos/role.dto.js";

const roleController = new RoleController(new RoleService(new RoleRepository()));

const roleRouter = Router();

roleRouter.post('/', validateBody(createRoleSchema), roleController.createRoleHandler);

export default roleRouter;