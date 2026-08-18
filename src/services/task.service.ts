import { Task } from "../../generated/prisma/client.js";
import { CreateTaskDto } from "../dtos/task.dto.js";
import { ITaskRepository } from "../repositories/task.repository.js";
import { NotfoundError } from "../utils/errors/app.error.js";

export interface ITaskService {
  getTaskById(taskId: bigint): Promise<Task>;
  createTask(data: CreateTaskDto): Promise<Task>;
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

  async createTask(data: CreateTaskDto): Promise<Task> {
  const task = await this.taskRepository.create({
    projectId: data.projectId,
    title: data.title,
    description: data.description,
    status: data.status,
    priority: data.priority,
    ownerId: data.ownerId,
    deadline: data.deadline
      ? new Date(data.deadline)
      : undefined,
  });

  return task;
}
}