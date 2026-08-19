import { Request, Response, NextFunction } from "express";

import { ITaskAssignmentService } from "../services/taskAssignment.service.js";

export class TaskAssignmentController {
    private readonly taskAssignmentService: ITaskAssignmentService;

    constructor(taskAssignmentService: ITaskAssignmentService) {
        this.taskAssignmentService = taskAssignmentService;
    }

    async assignTaskHandler(req: Request, res: Response, next: NextFunction) {
        // implement properly
    }

    async reAssignTaskHandler(req: Request, res: Response, next: NextFunction) {
        // implement properly
    }

    async unAssignTaskHandler(req: Request, res: Response, next: NextFunction) {
        // implement properly
    }
}