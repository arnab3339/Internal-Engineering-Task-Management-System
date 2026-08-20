import { Router } from "express";
import { ReviewRepository } from "../../repositories/review.repository.js";
import { ReviewService } from "../../services/review.service.js";
import { ReviewController } from "../../controllers/review.controller.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { validateRequestBody } from "../../middlewares/validate.middleware.js";
import { createReviewSchema } from "../../dtos/review.dto.js";
import { authorizeUser } from "../../middlewares/authorization.middleware.js";
import { RoleName } from "../../types/role.type.js";

const reviewRouter = Router();

const reviewController = new ReviewController(new ReviewService(new ReviewRepository()));

reviewRouter.post(
  "/",
  authenticateUser,
  authorizeUser(RoleName.ADMIN),
  validateRequestBody(createReviewSchema),
  reviewController.createReviewHandler.bind(reviewController)
);

export default reviewRouter;