import { Task } from "../../generated/prisma/client.js";
import { ITaskRepository } from "../repositories/task.repository.js";
import { NotfoundError } from "../utils/errors/app.error.js";

export interface ITaskService {
  getTaskById(taskId: bigint): Promise<Task>;
}

export class TaskService implements ITaskService {
  private readonly taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async getTaskById(taskId: bigint): Promise<Task> {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new NotfoundError("Task not found");
    }

    return task;
  }
}