import { Router } from "express";
import { ProjectController } from "../../controllers/project.controller.js";
import { ProjectService } from "../../services/project.service.js";
import { ProjectRepository } from "../../repositories/project.repository.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { authorizeUser } from "../../middlewares/authorization.middleware.js";
import { RoleName } from "../../types/role.type.js";
const router = Router();

const projectRepository = new ProjectRepository();
const projectService = new ProjectService(projectRepository);
const projectController = new ProjectController(projectService);

router.post(
  "/",
  authenticateUser,
  authorizeUser(RoleName.ADMIN),
  projectController.createProjectHandler.bind(projectController)
);
router.get(
  "/",
  authenticateUser,
  authorizeUser(RoleName.ADMIN),
  projectController.getAllProjectsHandler.bind(projectController)
);

export default router;