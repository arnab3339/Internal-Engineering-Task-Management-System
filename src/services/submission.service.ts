import { Submission } from "../../generated/prisma/client.js";
import { ISubmissionRepository } from "../repositories/submission.repository.js";
import { ITaskAssignmentRepository } from "../repositories/taskAssignment.repository.js";
import { ITaskService } from "./task.service.js";
import { UnauthorizedError } from "../utils/errors/app.error.js";
import { RoleName } from "../types/role.type.js";


export interface ISubmissionService {
    createSubmission(): Promise<void>; // populate parametrs and return type with using dto
    findTaskSubmissions(taskId: bigint, userId: bigint, role: RoleName): Promise<Submission[]>;
}

export class SubmissionService implements ISubmissionService {
    private readonly submissionRepository: ISubmissionRepository;
    private readonly taskAssignmentRepository: ITaskAssignmentRepository;
    private readonly taskService: ITaskService;

    constructor(
        submissionRepository: ISubmissionRepository,
        taskAssignmentRepository: ITaskAssignmentRepository,
        taskService: ITaskService,
        
    ) {
        this.submissionRepository = submissionRepository;
        this.taskAssignmentRepository = taskAssignmentRepository;
        this.taskService = taskService;
        
    }
    
    async createSubmission(): Promise<void> {
        // implement properly
    }

    async findTaskSubmissions(taskId: bigint, userId: bigint, role: string): Promise<Submission[]> {
        await this.taskService.getTaskById(taskId);

        if (role !== RoleName.ADMIN) {
            const currentAssignment = await this.taskAssignmentRepository.findCurrentByTaskAndDeveloper(taskId, userId);

            if (!currentAssignment) {
                throw new UnauthorizedError("You are not authorized to view submissions for this task");
            }
        }

        return this.submissionRepository.findByTaskId(taskId);
    }


}