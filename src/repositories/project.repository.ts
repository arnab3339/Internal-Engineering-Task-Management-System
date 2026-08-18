import { Project } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";
import { CreateProjectDto } from "../dtos/project.dto.js";
import { Prisma } from "../../generated/prisma/client.js";
export interface IProjectRepository {
  create(
    data: CreateProjectDto,
    createdBy: bigint
  ): Promise<Project>;
  getAllProjects(): Promise<Project[]>;
  getProjectById(
  projectId: bigint
): Promise<Prisma.ProjectGetPayload<{
  include: {
    members: true;
  };
}> | null>;
 updateProject(
  projectId: bigint,
  data: Prisma.ProjectUpdateInput
): Promise<Prisma.ProjectGetPayload<{}>>;
}

export class ProjectRepository implements IProjectRepository {
  async create(
    data: CreateProjectDto,
    createdBy: bigint
  ): Promise<Project> {
    return prisma.project.create({
      data: {
        name: data.name,
        description: data.description ?? null,
        startDate: data.startDate
          ? new Date(data.startDate)
          : null,
        targetEndDate: data.targetEndDate
          ? new Date(data.targetEndDate)
          : null,
        creator: {
          connect: {
            id: createdBy,
          },
        },
      },
    });
  }
  async getAllProjects(): Promise<Project[]> {
  return prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
async getProjectById(
  projectId: bigint
): Promise<Prisma.ProjectGetPayload<{
  include: {
    members: true;
  };
}> | null> {
  return prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      members: true,
    },
  });
}
async updateProject(
  projectId: bigint,
  data: Prisma.ProjectUpdateInput
): Promise<Prisma.ProjectGetPayload<{}>> {
  return prisma.project.update({
    where: {
      id: projectId,
    },
    data,
  });
}
}