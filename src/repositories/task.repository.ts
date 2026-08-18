import { Task } from "../../generated/prisma/client.js";

import { prisma } from "../configs/db.config.js";

export interface ITaskRepository {
  findById(id: bigint): Promise<Task | null>;
  create(data: any): Promise<Task>;
}

export class TaskRepository implements ITaskRepository {
  async findById(id: bigint): Promise<Task | null> {
    return prisma.task.findUnique({
      where: {
        id,
      },
    });
  }
  async create(data: any): Promise<Task> {
    return prisma.task.create({
      data,
    });
  }
}

