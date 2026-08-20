import { Prisma, Submission } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface ISubmissionRepository {
    create(data: Prisma.SubmissionCreateInput): Promise<Submission>;
}

export class SubmissionRepository implements ISubmissionRepository {
    async create(data: Prisma.SubmissionCreateInput): Promise<Submission> {
        // implement properly
    }
}