import { Router } from "express";
import { SubmissionController } from "../../controllers/submission.controller.js";
import { SubmissionService } from "../../services/submission.service.js";
import { SubmissionRepository } from "../../repositories/submission.repository.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { validateRequestParams } from "../../middlewares/validate.middleware.js";
import { submissionIdSchema } from "../../dtos/submission.dto.js";
import { authorizeUser } from "../../middlewares/authorization.middleware.js";
import { RoleName } from "../../types/role.type.js";

export const submissionRouter = Router();

const submissionController = new SubmissionController(new SubmissionService(new SubmissionRepository()));

// implement all the routers below

submissionRouter.get(
    "/:submissionId",
    authenticateUser,
    authorizeUser(RoleName.ADMIN),
    validateRequestParams(submissionIdSchema),
    submissionController.getSubmissionByIdHandler.bind(submissionController)
);