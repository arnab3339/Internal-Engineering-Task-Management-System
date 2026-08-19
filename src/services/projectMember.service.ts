import { Prisma, ProjectMember } from "../../generated/prisma/client.js";
import { IProjectMemberRepository, ProjectMemberWithUser} from "../repositories/projectMember.repository.js";
import { IProjectRepository } from "../repositories/project.repository.js";
import { IUserRepository } from "../repositories/user.repository.js";
import { RoleName } from "../types/role.type.js";
import { BadRequestError, ConflictError, NotfoundError , UnauthorizedError} from "../utils/errors/app.error.js";

export interface IProjectMemberService {
    addProjectMember(projectId: bigint, userId: bigint, addedBy: bigint): Promise<ProjectMember>;
    listProjectMembers(projectId: bigint, userId: bigint, role: RoleName): Promise<ProjectMemberWithUser[]>;
    removeProjectMember(projectId: bigint, userId: bigint): Promise<void>;
}

export class ProjectMemberService implements IProjectMemberService {
    private readonly projectMemberRepository: IProjectMemberRepository;
    private readonly projectRepository: IProjectRepository;
    private readonly userRepository: IUserRepository;
    constructor(
        projectMemberRepository: IProjectMemberRepository,
        projectRepository: IProjectRepository,
        userRepository: IUserRepository
    ) {

        this.projectMemberRepository = projectMemberRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;

    }

    async addProjectMember(projectId: bigint, userId: bigint, addedBy: bigint): Promise<ProjectMember> {
        const [project] = await Promise.all([
            this.projectRepository.getProjectById(projectId),
            this.userRepository.isUserExist(userId)
        ]);
        if(!project) {
            throw new NotfoundError(`No project exist with this given id: ${projectId}`);
        }

        const targetUser: boolean = await this.userRepository.isUserExist(userId);

        if(!targetUser) {
            throw new NotfoundError(`No existing member found with this given id: ${userId}`);
        }

        const existingMembership: boolean = await this.projectMemberRepository.findActiveMembership(projectId, userId);

        if (existingMembership) {
            throw new ConflictError("User is already an active member of this project");
        }

        return await this.projectMemberRepository.create(projectId, userId, addedBy);
    }


    async listProjectMembers(projectId: bigint, userId: bigint, role: RoleName): Promise<ProjectMemberWithUser[]> {
        const membershipCheck = role == RoleName.ADMIN
            ? true
            : this.projectMemberRepository.findActiveMembership(projectId, userId)
        

        const [project, isAuthorized] = await Promise.all([
            this.projectRepository.getProjectById(projectId),
            membershipCheck
        ]);

        if (!project) {
            throw new NotfoundError(`No project exist with this given id: ${projectId}`);
        }

        if (!isAuthorized) {
        throw new UnauthorizedError("You are not authorized to view this project's members");
        }

        return await this.projectMemberRepository.findByProjectId(projectId);
    }

    
    async removeProjectMember(projectId: bigint, userId: bigint): Promise<void> {
        const removed: boolean = await this.projectMemberRepository.removeMember(projectId, userId);

        if (!removed) {
        throw new NotfoundError(`No active membership found for user ${userId} in project ${projectId}`);
        }
    }

}