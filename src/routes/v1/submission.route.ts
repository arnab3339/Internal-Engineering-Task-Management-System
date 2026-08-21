import { Router } from "express";
import { SubmissionController } from "../../controllers/submission.controller.js";
import { SubmissionService } from "../../services/submission.service.js";
import { SubmissionRepository } from "../../repositories/submission.repository.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { validateRequestParams,validateRequestBody } from "../../middlewares/validate.middleware.js";
import { submissionIdSchema } from "../../dtos/submission.dto.js";
import { authorizeUser } from "../../middlewares/authorization.middleware.js";
import { RoleName } from "../../types/role.type.js";
import { createSubmissionSchema } from "../../dtos/submission.dto.js";
import { TaskRepository } from "../../repositories/task.repository.js";
import { taskIdSchema } from "../../dtos/task.dto.js";

export const submissionRouter = Router();

const submissionController = new SubmissionController(new SubmissionService(new SubmissionRepository(),new TaskRepository()));

// implement all the routers below
submissionRouter.post(
    "/",
    authenticateUser,
    validateRequestBody(createSubmissionSchema),
    validateRequestParams(taskIdSchema),
    submissionController.createSubmissionHandler.bind(submissionController)
);

submissionRouter.get(
    "/:submissionId",
    authenticateUser,
    authorizeUser(RoleName.ADMIN),
    validateRequestParams(submissionIdSchema),
    submissionController.getSubmissionByIdHandler.bind(submissionController)
);