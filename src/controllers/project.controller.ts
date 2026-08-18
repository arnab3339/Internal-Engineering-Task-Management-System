import { Request, Response, NextFunction } from "express";
import { ProjectService } from "../services/project.service.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";
import { AuthenticatedRequest } from "../types/auth.type.js";
import { RoleName } from "../types/role.type.js";
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
async getProjectByIdHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req as AuthenticatedRequest;

    const projectId = BigInt(req.params.id);

    const project = await this.projectService.getProjectById(
      projectId,
      user.userId,
      user.role as RoleName
    );

    sendSuccess(
      res,
      project,
      200,
      "Project fetched successfully"
    );
  } catch (error) {
    next(error);
  }
}
}