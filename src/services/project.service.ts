import { CreateProjectDto } from "../dtos/project.dto.js";
import { IProjectRepository } from "../repositories/project.repository.js";
import { Project } from "../../generated/prisma/client.js";

export interface IProjectService {
  createProject(
    data: CreateProjectDto,
    createdBy: bigint
  ): Promise<Project>;
  getAllProjects(): Promise<Project[]>;
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
}