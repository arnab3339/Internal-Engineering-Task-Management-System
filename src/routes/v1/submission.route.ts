import { Router } from "express";
import { SubmissionController } from "../../controllers/submission.controller.js";
import { SubmissionService } from "../../services/submission.service.js";
import { SubmissionRepository } from "../../repositories/submission.repository.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { validateRequestBody,validateRequestParams } from "../../middlewares/validate.middleware.js";
import { createSubmissionSchema } from "../../dtos/submission.dto.js";
import { taskIdSchema } from "../../dtos/task.dto.js";

export const submissionRouter = Router();

const submissionController = new SubmissionController(new SubmissionService(new SubmissionRepository()));

// implement all the routers below
submissionRouter.post(
    "/:taskId/submissions",
    authenticateUser,
    validateRequestParams(taskIdSchema),
    validateRequestBody(createSubmissionSchema),
    submissionController.createSubmissionHandler.bind(submissionController)
);