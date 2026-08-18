import { Prisma, ProjectMember } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface IProjectMemberRepository {
    create(projectId: bigint, userId: bigint, addedBy: bigint): Promise<ProjectMember>;
    findActiveMembership(projectId: bigint, userId: bigint): Promise<boolean>;
}

export class ProjectMemberRepository implements IProjectMemberRepository {
    async create(projectId: bigint, userId: bigint, addedBy: bigint): Promise<ProjectMember> {
        const data: Prisma.ProjectMemberCreateInput = {
            project: { connect: { id: projectId } },
            user: { connect: { id: userId } },
            addedByUser: { connect: { id: addedBy } },
        };

        return await prisma.projectMember.create({
            data
        });
    }

    async findActiveMembership(projectId: bigint, userId: bigint): Promise<boolean> {
        const membership = prisma.projectMember.findFirst({
            where: {
                projectId,
                userId,
                removedAt: null
            },

            select: { id: true }
        });

        return membership !== null;
    }
}