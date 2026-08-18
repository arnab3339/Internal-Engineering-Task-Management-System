import { Request, Response, NextFunction } from "express";
import { ProjectService } from "../services/project.service.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";
import { AuthenticatedRequest } from "../types/express.js";
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
  async getAllProjectsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const projects = await this.projectService.getAllProjects();

    sendSuccess(res, projects, 200, "Projects fetched successfully");
  } catch (error) {
    next(error);
  }
}

}