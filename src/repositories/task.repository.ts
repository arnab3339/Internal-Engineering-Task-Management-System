import { Task } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface ITaskRepository {
  findById(id: bigint): Promise<Task | null>;
}

export class TaskRepository implements ITaskRepository {
  async findById(id: bigint): Promise<Task | null> {
    return prisma.task.findUnique({
      where: {
        id,
      },
    });
  }
}