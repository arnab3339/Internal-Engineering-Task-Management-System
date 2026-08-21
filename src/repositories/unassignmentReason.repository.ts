import { UnassignmentReason } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface IUnassignmentReasonRepository {
  findAll(): Promise<UnassignmentReason[]>;
}

export class UnassignmentReasonRepository implements IUnassignmentReasonRepository {
  async findAll(): Promise<UnassignmentReason[]> {
    return prisma.unassignmentReason.findMany();
  }
}