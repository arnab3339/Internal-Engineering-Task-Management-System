import { Prisma,Review,Submission } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface IReviewRepository {
  create(data: Prisma.ReviewCreateInput): Promise<Review>;
  getPendingReviews(): Promise<Submission[]>;
}

export class ReviewRepository implements IReviewRepository {
  async create(data: Prisma.ReviewCreateInput): Promise<Review> {
    return prisma.review.create({
      data,
    });
  }
  async getPendingReviews(): Promise<Submission[]> {
    return prisma.submission.findMany({
      where: {
        review: null,
      },
    });
  }
}