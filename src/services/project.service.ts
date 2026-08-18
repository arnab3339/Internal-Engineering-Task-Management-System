import { CreateProjectDto,UpdateProjectDto } from "../dtos/project.dto.js";
import { IProjectRepository } from "../repositories/project.repository.js";
import { Project } from "../../generated/prisma/client.js";
import { RoleName } from "../types/role.type.js";
import { Prisma } from "../../generated/prisma/client.js";
import { NotfoundError,UnauthorizedError } from "../utils/errors/app.error.js";

export interface IProjectService {
  createProject(
    data: CreateProjectDto,
    createdBy: bigint
  ): Promise<Project>;
  getAllProjects(): Promise<Project[]>;
  getProjectById(
  projectId: bigint,
  userId: bigint,
  role: RoleName
): Promise<Prisma.ProjectGetPayload<{
  include: {
    members: true;
  };
}>>;
updateProject(
  projectId: bigint,
  data: UpdateProjectDto
): Promise<Prisma.ProjectGetPayload<{}>>;
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
): Promise<Prisma.ProjectGetPayload<{
  include: {
    members: true;
  };
}> >{
  const project = await this.projectRepository.getProjectById(projectId);

  if (!project) {
    throw new NotfoundError("Project not found");
  }

  if (role === RoleName.ADMIN) {
    return project;
  }

  const isMember = project.members.some(
    (member) =>
      member.userId === userId &&
      member.removedAt === null
  );

  if (!isMember) {
    throw new UnauthorizedError(
      "You are not authorized to view this project"
    );
  }

  return project;
}
async updateProject(
  projectId: bigint,
  data: UpdateProjectDto
): Promise<Prisma.ProjectGetPayload<{}>> {
  const project = await this.projectRepository.getProjectById(projectId);

  if (!project) {
    throw new NotfoundError("Project not found");
  }

  const updateData: Prisma.ProjectUpdateInput = {
    ...(data.name !== undefined && { name: data.name }),
    ...(data.description !== undefined && {
      description: data.description,
    }),
    ...(data.startDate !== undefined && {
      startDate: data.startDate ? new Date(data.startDate) : null,
    }),
    ...(data.targetEndDate !== undefined && {
      targetEndDate: data.targetEndDate
        ? new Date(data.targetEndDate)
        : null,
    }),
  };

  return await this.projectRepository.updateProject(
    projectId,
    updateData
  );
}
}