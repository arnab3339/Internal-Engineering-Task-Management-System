import { Request, Response, NextFunction } from "express";
import { ProjectService } from "../services/project.service.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";
import { AuthenticatedRequest } from "../types/auth.type.js";

export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  async createProjectHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { user } = req as AuthenticatedRequest;

      const project = await this.projectService.createProject(
        req.body,
        user.userId
      );

      sendSuccess(res, project, 201, "Project created successfully");
    } catch (error) {
      next(error);
    }
  }
}