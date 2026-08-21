import { Router } from "express";
import { TaskRepository } from "../../repositories/task.repository.js";
import { CommentController } from "../../controllers/comment.controller.js";
import { CommentService } from "../../services/comment.service.js";
import { CommentRepository } from "../../repositories/comment.repository.js";
import { createCommentSchema,commentTaskIdSchema } from "../../dtos/comment.dto.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { authorizeUser } from "../../middlewares/authorization.middleware.js";
import { validateRequestBody,validateRequestParams } from "../../middlewares/validate.middleware.js";
import { RoleName } from "../../types/role.type.js";

const commentController = new CommentController(new CommentService(new CommentRepository(),new TaskRepository()));

export const commentRouter = Router({ mergeParams: true });

commentRouter.post(
    "/",
    authenticateUser,
    authorizeUser(RoleName.ADMIN),
    validateRequestParams(commentTaskIdSchema),
    validateRequestBody(createCommentSchema),
    commentController.createCommentHandler.bind(commentController)
);

// implement all the routes below