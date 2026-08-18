import { Router } from "express";
import { ProjectMemberController } from "../../controllers/projectMember.controller.js";
import { ProjectMemberService } from "../../services/projectMember.service.js";
import { ProjectMemberRepository } from "../../repositories/projectMember.repository.js";
import { ProjectController } from "../../controllers/project.controller.js";
import { ProjectService } from "../../services/project.service.js";
import { ProjectRepository } from "../../repositories/project.repository.js";
import { UserService } from "../../services/user.service.js";
import { UserRepository } from "../../repositories/user.repository.js";
import { validateRequestBody, validateRequestParams } from "../../middlewares/validate.middleware.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { authorizeUser } from "../../middlewares/authorization.middleware.js";
import { projectIdParamSchema, addProjectMemberSchema } from "../../dtos/projectMember.dto.js";
import { RoleName } from "../../types/role.type.js";

const projectMemberController = new ProjectMemberController(
    new ProjectMemberService(
        new ProjectMemberRepository(),
        new UserService(new UserRepository())
    )
);

const projectRepository = new ProjectRepository();
const projectService = new ProjectService(projectRepository);
const projectController = new ProjectController(projectService);


const projectRouter = Router();

projectRouter.post(
    "/",
    authenticateUser,
    authorizeUser(RoleName.ADMIN),
    projectController.createProjectHandler.bind(projectController)
);


projectRouter.post(
    "/:projectId/members",
    authenticateUser,
    authorizeUser(RoleName.ADMIN),
    validateRequestParams(projectIdParamSchema),
    validateRequestBody(addProjectMemberSchema),
    projectMemberController.addProjectMemberHandler.bind(projectMemberController)
);

export default projectRouter;

