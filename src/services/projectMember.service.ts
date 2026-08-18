import { Prisma, ProjectMember } from "../../generated/prisma/client.js";
import { IProjectMemberRepository } from "../repositories/projectMember.repository.js";
import { IUserService } from "./user.service.js";
import { RoleName } from "../types/role.type.js";
import { BadRequestError, ConflictError, NotfoundError } from "../utils/errors/app.error.js";

export interface IProjectMemberService {
    addProjectMember(projectId: bigint, userId: bigint, addedBy: bigint): Promise<ProjectMember>;
}

export class ProjectMemberService implements IProjectMemberService {
    private readonly projectMemberRepository: IProjectMemberRepository;
    private readonly userService: IUserService;

    constructor(
        projectMemberRepository: IProjectMemberRepository,
        userService: IUserService
    ) {
        this.projectMemberRepository = projectMemberRepository;
        this.userService = userService;
    }

    async addProjectMember(projectId: bigint, userId: bigint, addedBy: bigint): Promise<ProjectMember> {
        const targetUser = await this.userService.findUserById(userId);

        if (targetUser.role.name !== RoleName.DEVELOPER) {
            throw new BadRequestError("Only users with the Developer role can be added as project members");
        }

        const existingMembership = await this.projectMemberRepository.findActiveMembership(projectId, userId);

        if (existingMembership) {
            throw new ConflictError("User is already an active member of this project");
        }


        try {
            return await this.projectMemberRepository.create(projectId, userId, addedBy);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ConflictError("User is already an active member of this project");
                }
                if (error.code === "P2003") {
                    throw new NotfoundError("Project not found");
                }
            }

            throw error;
        }
    }
}