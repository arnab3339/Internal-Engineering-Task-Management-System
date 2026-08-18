import { CreateProjectDto } from "../dtos/project.dto.js";
import { IProjectRepository } from "../repositories/project.repository.js";
import { Project } from "../../generated/prisma/client.js";
import { Prisma } from "../../generated/prisma/client.js";
import { NotfoundError } from "../utils/errors/app.error.js";
import { UnauthorizedError } from "../utils/errors/app.error.js";
import { RoleName } from "../types/role.type.js";

export interface IProjectService {
  createProject(
    data: CreateProjectDto,
    createdBy: bigint
  ): Promise<Project>;
  getAllProjects(): Promise<Project[]>;
  getProjectById(projectId: bigint): Promise<Prisma.ProjectGetPayload<{}>>;
}

export class ProjectService implements IProjectService {
  private readonly projectRepository: IProjectRepository;

  constructor(projectRepository: IProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async createProject(
    data: CreateProjectDto,
    createdBy: bigint
  ): Promise<Project> {
    return await this.projectRepository.create(data, createdBy);
  }
  async getAllProjects(): Promise<Project[]> {
  return await this.projectRepository.getAllProjects();
}
async getProjectById(
  projectId: bigint,
  userId: bigint,
  role: RoleName
) {
  const project = await this.projectRepository.getProjectById(projectId);
  if (!project) {
    throw new NotfoundError("Project not found");
  }
  if (role === RoleName.ADMIN) {
    return project;
  }
  const isMember = project.projectMembers.some(
    (member) =>
      member.userId === userId &&
      member.removedAt === null
  );
if (!isMember) {
    throw new UnauthorizedError(
      "You are not a member of this project"
    );
  }

  return project;
}
}