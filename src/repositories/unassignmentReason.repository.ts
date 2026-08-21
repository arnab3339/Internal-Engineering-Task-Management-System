import { UnassignmentReason } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface IUnassignmentReasonRepository {
  findAll(): Promise<UnassignmentReason[]>;
  findById(id: bigint): Promise<UnassignmentReason | null>;
}

export class UnassignmentReasonRepository implements IUnassignmentReasonRepository {
  async findAll(): Promise<UnassignmentReason[]> {
    return prisma.unassignmentReason.findMany();
  }
  async findById(id: bigint): Promise<UnassignmentReason | null> {
  return prisma.unassignmentReason.findUnique({
     where: { id },
    });
 }
}