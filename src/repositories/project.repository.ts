import { Project } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";
import { CreateProjectDto } from "../dtos/project.dto.js";

export interface IProjectRepository {
  create(
    data: CreateProjectDto,
    createdBy: bigint
  ): Promise<Project>;
  getAllProjects(): Promise<Project[]>;
  getProjectById(
  projectId: bigint
): Promise<Prisma.ProjectGetPayload<{}> | null>;
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
): Promise<Prisma.ProjectGetPayload<{}> | null> {
  return prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });
}
}