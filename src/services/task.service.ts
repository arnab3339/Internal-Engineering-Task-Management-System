import { Prisma, Task } from "../../generated/prisma/client.js";
import { CreateTaskDto } from "../dtos/task.dto.js";
import { ITaskRepository } from "../repositories/task.repository.js";
import { NotfoundError, ForbiddenError, BadRequestError} from "../utils/errors/app.error.js";
import { UpdateTaskDto,UpdateTaskStatusDto } from "../dtos/task.dto.js";
import { logger } from "../configs/logger.config.js";
import { ITaskAssignmentRepository } from "../repositories/taskAssignment.repository.js";


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
    const existingTask = await this.taskRepository.findById(taskId);
    
    if (!existingTask) {
      logger.error(`Task update failed. Task not found with ID: ${taskId}`);
      throw new NotfoundError("Task not found"); 
    }

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

async updateTaskStatus(
  taskId: bigint,
  userId: bigint,
  role: string,
  status: string
): Promise<Task> {
  const existingTask = await this.taskRepository.findById(taskId);

  if (!existingTask) {
    logger.error(`Task status update failed. Task not found with ID: ${taskId}`);
    throw new NotfoundError("Task not found");
  }

  if (role === "DEVELOPER") {
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

    const currentStatus = existingTask.status as string;

    if (status !== "IN_PROGRESS") {
      logger.error(
        `Task status update failed. Developer attempted invalid status ${status} for task ID: ${taskId}`
      );
      throw new BadRequestError(
        "Task can only be moved to IN_PROGRESS"
      );
    }

    if (currentStatus !== "TODO") {
      logger.error(
        `Task status update failed. Invalid status transition for task ID: ${taskId}`
      );
      throw new BadRequestError(
        "Task can only be moved to IN_PROGRESS from TODO status"
      );
    }
  }

  if (role === "ADMIN") {
    if (
      status !== "COMPLETED" &&
      status !== "CHANGES_REQUESTED"
    ) {
      logger.error(
        `Admin status update failed. Invalid status ${status} for task ID: ${taskId}`
      );
      throw new BadRequestError(
        "Admin can only move the task to COMPLETED or CHANGES_REQUESTED"
      );
    }
  }

  const updatedTask = await this.taskRepository.updateTaskStatus(
    taskId,
    status
  );

  return updatedTask;
}
}