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
}