import { Router } from "express";
import { ReviewController } from "../../controllers/review.controller.js";
import { ReviewService } from "../../services/review.service.js";
import { ReviewRepository } from "../../repositories/review.repository.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { authorizeUser } from "../../middlewares/authorization.middleware.js";
import { validateRequestBody } from "../../middlewares/validate.middleware.js";
import { createReviewSchema } from "../../dtos/review.dto.js";
import { RoleName } from "../../types/role.type.js";
import { SubmissionRepository } from "../../repositories/submission.repository.js";

export const reviewRouter = Router({mergeParams:true});

const reviewController = new ReviewController(new ReviewService(new ReviewRepository(), new SubmissionRepository()));

reviewRouter.post(
  "/",
  authenticateUser,
  authorizeUser(RoleName.ADMIN),
  validateRequestBody(createReviewSchema),
  reviewController.createReviewHandler.bind(reviewController)
);


reviewRouter.get(
  "/pending",
  authenticateUser,
  authorizeUser(RoleName.ADMIN),
  reviewController.getPendingReviewsHandler.bind(reviewController)
);