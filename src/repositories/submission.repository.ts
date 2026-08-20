import { Prisma, Submission } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface ISubmissionRepository {
    create(data: Prisma.SubmissionCreateInput): Promise<Submission>;
    findLatestSubmissionNumber(taskId: bigint): Promise<number>;
    findById(id: bigint): Promise<Submission | null>;
    findByTaskId(taskId: bigint): Promise<Submission[]>;
}

export class SubmissionRepository implements ISubmissionRepository {
    async create(data: Prisma.SubmissionCreateInput): Promise<Submission> {
        return prisma.submission.create({
            data,
        });
    }
    async findLatestSubmissionNumber(taskId: bigint): Promise<number> {
      const submission = await prisma.submission.findFirst({
        where: {
        taskId,
        },
        orderBy: {
          submissionNumber: "desc",
        },
        select: {
          submissionNumber: true,
        },
      });
      return submission?.submissionNumber ?? null;
    }
    async findById(id: bigint): Promise<Submission | null> {
      return prisma.submission.findUnique({
        where: {
          id,
        },
      });
    }
    async findByTaskId(taskId: bigint): Promise<Submission[]> {
        return prisma.submission.findMany({
            where: {
                taskId
            },
            orderBy: {
                submissionNumber: 'asc'
            }
        });
    }

}