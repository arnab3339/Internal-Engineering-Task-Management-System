import { Review } from "../generated/prisma/client.js";
import { CreateReviewDTO } from "../dtos/review.dto.js";
import { ReviewRepository } from "../repositories/review.repository.js";

export interface IReviewService {
  createReview(submissionId: bigint, reviewedBy: bigint, data: CreateReviewDTO): Promise<Review>;
}

export class ReviewService implements IReviewService {
  private readonly reviewRepository: ReviewRepository;

  constructor(reviewRepository: ReviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  async createReview(submissionId: bigint, reviewedBy: bigint, data: CreateReviewDTO): Promise<Review> {
    return this.reviewRepository.create({
      submission: {
        connect: {
          id: submissionId,
        },
      },
      reviewedByUser: {
        connect: {
          id: reviewedBy,
        },
      },
      requirementAnalysisScore: data.requirementAnalysisScore,
      codeQualityScore: data.codeQualityScore,
      codeCorrectnessScore: data.codeCorrectnessScore,
      testingScore: data.testingScore,
      deliveryTimingScore: data.deliveryTimingScore,
      prCommitQualityScore: data.prCommitQualityScore,
      feedback: data.feedback,
      decision: data.decision,
    });
  }
}