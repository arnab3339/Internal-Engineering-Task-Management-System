import { ProjectMember } from "../../generated/prisma/client.js";
import { IProjectMemberRepository } from "../repositories/projectMember.repository.js";
import { ConflictError, NotfoundError } from "../utils/errors/app.error.js";
import { IUserRepository } from "../repositories/user.repository.js";
import { IProjectRepository } from "../repositories/project.repository.js";

export interface IProjectMemberService {
    addProjectMember(projectId: bigint, userId: bigint, addedBy: bigint): Promise<ProjectMember>;
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
        const isProjectExist: boolean = await this.projectRepository.isProjectExist(projectId);

        if(!isProjectExist) {
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
}