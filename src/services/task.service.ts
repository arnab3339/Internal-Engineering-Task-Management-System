import { Prisma, Task } from "../../generated/prisma/client.js";
import { CreateTaskDto } from "../dtos/task.dto.js";
import { ITaskRepository } from "../repositories/task.repository.js";
import { NotfoundError, ForbiddenError, BadRequestError} from "../utils/errors/app.error.js";
import { UpdateTaskDto } from "../dtos/task.dto.js";
import { logger } from "../configs/logger.config.js";
import { ITaskAssignmentRepository } from "../repositories/taskAssignment.repository.js";
import { validateStatusTransition, validateAdminStatusTransition} from "../utils/helpers/task-status.helper.js";


export interface ITaskService {
  getTaskById(taskId: bigint): Promise<Task>;
  createTask(data: CreateTaskDto, createdBy: bigint): Promise<Task>;
 updateTask(taskId: bigint, data: UpdateTaskDto): Promise<Task>;
updateTaskStatus(taskId: bigint,userId: bigint,role: string,status: string): Promise<Task>;}

export class TaskService implements ITaskService {
  private readonly taskRepository: ITaskRepository;
  private readonly taskAssignmentRepository: ITaskAssignmentRepository;

  constructor(taskRepository: ITaskRepository,taskAssignmentRepository: ITaskAssignmentRepository) {
    this.taskRepository = taskRepository;
    this.taskAssignmentRepository = taskAssignmentRepository;

  }

  private async validateAssignee(taskId: bigint,userId: bigint): Promise<void> {
  const currentAssignment =
    await this.taskAssignmentRepository.findCurrentAssignment(
      taskId,
      userId
    );

    

  if (!currentAssignment) {
    logger.error(
      `Task status update failed. User is not the current assignee for task ID: ${taskId}`
    );

    throw new ForbiddenError(
      "You are not the current assignee of this task"
    );
  }
}
private async validateTaskExists(taskId: bigint): Promise<Task> {
  const task = await this.taskRepository.findById(taskId);

  if (!task) {
    logger.error(`Task status update failed. Task not found with ID: ${taskId}`);
    throw new NotfoundError("Task not found");
  }

  return task;
}


  async getTaskById(taskId: bigint): Promise<Task> {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new NotfoundError("Task not found");
    }

    return task;
  }

  async createTask(data: CreateTaskDto, createdBy: bigint): Promise<Task> {
    const task = await this.taskRepository.create({
      projectId: data.projectId,
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      createdBy,
      deadline: data.deadline
        ? new Date(data.deadline)
        : undefined,
    });

    return task;
  }
  
  async updateTask(taskId: bigint, data: UpdateTaskDto) {
    const existingTask = await this.validateTaskExists(taskId);

    const updateData: Prisma.TaskUpdateInput = {};

    if (data.title !== undefined) {
      updateData.title = data.title;
    }

    if (data.description !== undefined) {
      updateData.description = data.description;
    }

    if (data.priority !== undefined) {
      updateData.priority = data.priority;
    }

    if (data.deadline !== undefined) {
      updateData.deadline = data.deadline;
    }

    const updatedTask = await this.taskRepository.updateTask(
      taskId, 
      updateData
    );
    
    return updatedTask;
  }

  async updateTaskStatus(taskId: bigint,userId: bigint,role: string, status: string): Promise<Task> {
  const existingTask = await this.validateTaskExists(taskId);

  if (role === "DEVELOPER") {
    await this.validateAssignee(taskId, userId);

    validateStatusTransition(
      existingTask.status as string,
      status
    );
  }

  if (role === "ADMIN") {
    validateAdminStatusTransition(
      existingTask.status as string,
      status
    );
  }

  const updatedTask = await this.taskRepository.updateTaskStatus(
    taskId,
    status
  );

  return updatedTask;
}

}