import { Router } from "express";
import { SubmissionController } from "../../controllers/submission.controller.js";
import { SubmissionService } from "../../services/submission.service.js";
import { SubmissionRepository } from "../../repositories/submission.repository.js";
import { TaskAssignmentRepository } from "../../repositories/taskAssignment.repository.js";
import { TaskService } from "../../services/task.service.js";
import { TaskRepository } from "../../repositories/task.repository.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { validateRequestParams } from "../../middlewares/validate.middleware.js";
import { taskIdSchema } from "../../dtos/task.dto.js";


export const submissionRouter = Router();
export const taskSubmissionsRouter = Router();

export const submissionController = new SubmissionController(
    new SubmissionService(
        new SubmissionRepository(),
        new TaskAssignmentRepository(),
        new TaskService(new TaskRepository())
    )
);

taskSubmissionsRouter.get(
    "/:taskId/submissions",
    authenticateUser,
    validateRequestParams(taskIdSchema),
    submissionController.getTaskSubmissionsHandler.bind(submissionController)
);


// implement all the routers below