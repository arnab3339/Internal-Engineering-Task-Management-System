import { Prisma, Review } from "../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface IReviewRepository {
  create(data: Prisma.ReviewCreateInput): Promise<Review>;
}

export class ReviewRepository implements IReviewRepository {
  async create(data: Prisma.ReviewCreateInput): Promise<Review> {
    return prisma.review.create({
      data,
    });
  }
}