import { Request, Response, NextFunction } from "express";
import { TaskService } from "../services/task.service.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";

export class TaskController {
  private readonly taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  async getTaskByIdHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = req.params.taskId as string;
      
      const task = await this.taskService.getTaskById(BigInt(taskId));

      sendSuccess(res, task, 200, "Task fetched successfully");
    } catch (error) {
      next(error);
    }
  }

  async updateTaskHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = req.params.taskId as string;
      const updateData = req.body;

      const updatedTask = await this.taskService.updateTask(BigInt(taskId), updateData);

      sendSuccess(res, updatedTask, 200, "Task updated successfully");
    } catch (error) {
      next(error);
    }
  }
}