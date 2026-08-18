import { Prisma, ProjectMember } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface IProjectMemberRepository {
    create(data: Prisma.ProjectMemberCreateInput): Promise<ProjectMember>;
    findActiveMembership(projectId: bigint, userId: bigint): Promise<ProjectMember | null>;
}

export class ProjectMemberRepository implements IProjectMemberRepository {
    async create(data: Prisma.ProjectMemberCreateInput): Promise<ProjectMember> {
        return await prisma.projectMember.create({
            data
        });
    }

    async findActiveMembership(projectId: bigint, userId: bigint): Promise<ProjectMember | null> {
        return prisma.projectMember.findFirst({
            where: {
                projectId,
                userId,
                removedAt: null
            }
        });
    }
}