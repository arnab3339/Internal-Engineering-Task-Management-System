import { CreateProjectDto } from "../dtos/project.dto.js";
import { IProjectRepository } from "../repositories/project.repository.js";
import { Project } from "../../generated/prisma/client.js";
import { RoleName } from "../types/role.type.js";
import { NotfoundError,UnauthorizedError } from "../utils/errors/app.error.js";
import { IProjectMemberRepository } from "../repositories/projectMember.repository.js";

export interface IProjectService {
  createProject(data: CreateProjectDto, createdBy: bigint): Promise<Project>;
  getAllProjects(): Promise<Project[]>;
  getProjectById(projectId: bigint, userId: bigint, role: RoleName): Promise<Project>;
}

export class ProjectService implements IProjectService {
  private readonly projectRepository: IProjectRepository;
  private readonly projectMemberRepository: IProjectMemberRepository;

  constructor(projectRepository: IProjectRepository, projectMemberRepository: IProjectMemberRepository) {
    this.projectRepository = projectRepository;
    this.projectMemberRepository = projectMemberRepository;
  }

  async createProject(data: CreateProjectDto, createdBy: bigint): Promise<Project> {
    return await this.projectRepository.create(data, createdBy);
  }

  async getAllProjects(): Promise<Project[]> {
    return await this.projectRepository.getAllProjects();
  }

  async getProjectById(projectId: bigint, userId: bigint, role: RoleName): Promise<Project> {
    const project: Project | null = await this.projectRepository.getProjectById(projectId);

    if (!project) {
      throw new NotfoundError("Project not found");
    }

    if (role === RoleName.ADMIN) {
      return project;
    }

    const isProjectMember: boolean = await this.projectMemberRepository.findActiveMembership(projectId, userId);

    if(!isProjectMember) {
      throw new UnauthorizedError("You are not authorized to view this project");
    }

    return project;
  }
}