import { Task } from "../../generated/prisma/client.js";
import { ITaskRepository } from "../repositories/task.repository.js";
import { NotfoundError } from "../utils/errors/app.error.js";
import { UpdateTaskDto } from "../dtos/task.dto.js";
import { logger } from "../configs/logger.config.js";



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

  async updateTask(taskId: bigint, data: UpdateTaskDto) {
    logger.info(`Attempting to update task with ID: ${taskId}`);

    const existingTask = await this.taskRepository.findById(taskId);
    
    if (!existingTask) {
      logger.error(`Task update failed. Task not found with ID: ${taskId}`);
      throw new NotfoundError("Task not found"); 
    }

    const updatedTask = await this.taskRepository.updateTask(
      taskId, 
      data as Parameters<ITaskRepository["updateTask"]>[1]
    );
    
    logger.info(`Successfully updated task with ID: ${taskId}`);
    
    return updatedTask;
  }
}