import { Prisma, ProjectMember } from "../../generated/prisma/client.js";
import { IProjectMemberRepository, ProjectMemberWithUser} from "../repositories/projectMember.repository.js";
import { IProjectRepository } from "../repositories/project.repository.js";
import { IUserService } from "./user.service.js";
import { RoleName } from "../types/role.type.js";
import { BadRequestError, ConflictError, NotfoundError , UnauthorizedError} from "../utils/errors/app.error.js";

export interface IProjectMemberService {
    addProjectMember(projectId: bigint, userId: bigint, addedBy: bigint): Promise<ProjectMember>;
    listProjectMembers(projectId: bigint, userId: bigint, role: RoleName): Promise<ProjectMemberWithUser[]>;
}

export class ProjectMemberService implements IProjectMemberService {
    private readonly projectMemberRepository: IProjectMemberRepository;
    private readonly projectRepository: IProjectRepository;
    private readonly userService: IUserService;

    constructor(
        projectMemberRepository: IProjectMemberRepository,
        projectRepository: IProjectRepository,
        userService: IUserService
    ) {

        this.projectMemberRepository = projectMemberRepository;
        this.projectRepository = projectRepository;
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


    async listProjectMembers(projectId: bigint, userId: bigint, role: RoleName): Promise<ProjectMemberWithUser[]> {
        const project = await this.projectRepository.getProjectById(projectId);

        if (!project) {
            throw new NotfoundError(`No project exist with this given id: ${projectId}`);
        }

        if (role !== RoleName.ADMIN) {
            const isProjectMember: boolean = await this.projectMemberRepository.findActiveMembership(projectId, userId);

            if (!isProjectMember) {
                throw new UnauthorizedError("You are not authorized to view this project's members");
            }
        }

        return await this.projectMemberRepository.findByProjectId(projectId);
}

}