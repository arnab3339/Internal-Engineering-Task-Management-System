import { Request, Response, NextFunction } from "express";
import { IReviewService } from "../services/review.service.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";
import { AuthenticatedRequest } from "../types/express.js";

export class ReviewController {
  private readonly reviewService: IReviewService;

  constructor(reviewService: IReviewService) {
    this.reviewService = reviewService;
  }

  async createReviewHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req as AuthenticatedRequest;
      const submissionId = BigInt(req.params.submissionId as string);
      const review = await this.reviewService.createReview(
        submissionId,
        user.userId,
        req.body
      );

      sendSuccess(res, review, 201, "Review created successfully");
    } catch (error) {
      next(error);
    }
  }
  async getPendingReviewsHandler(
    _req: Request,
    res: Response,
    next: NextFunction
    ) {
        try {
            const reviews = await this.reviewService.getPendingReviews();
            sendSuccess(res, reviews, 200, "Pending reviews fetched successfully");
        } catch (error) {
            next(error);
        }
    }
}