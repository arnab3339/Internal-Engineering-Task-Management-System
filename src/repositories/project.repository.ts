import { Project } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";
import { CreateProjectDto } from "../dtos/project.dto.js";

export interface IProjectRepository {
  create(
    data: CreateProjectDto,
    createdBy: bigint
  ): Promise<Project>;
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
}