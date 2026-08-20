import { ISubmissionRepository } from "../repositories/submission.repository.js";
import { CreateSubmissionDto } from "../dtos/submission.dto.js";
import { Submission } from "../../generated/prisma/client.js";
import { NotfoundError} from "../utils/errors/app.error.js";
import { ITaskRepository } from "../repositories/task.repository.js";

export interface ISubmissionService {
    createSubmission(taskId: bigint, submittedBy: bigint, data: CreateSubmissionDto): Promise<Submission>; 
    findSubmissionById(id: bigint): Promise<Submission | null>;
}
export class SubmissionService implements ISubmissionService {
    private readonly submissionRepository: ISubmissionRepository;
    private readonly taskRepository: ITaskRepository;
    constructor(submissionRepository: ISubmissionRepository, taskRepository: ITaskRepository) {
        this.submissionRepository = submissionRepository;
        this.taskRepository = taskRepository;
    }
    
    async createSubmission(taskId: bigint, submittedBy: bigint, data: CreateSubmissionDto): Promise<Submission> {
        const task = await this.taskRepository.findById(taskId);
        if (!task) {
            throw new NotfoundError("Task not found");
        }
        const latestSubmissionNumber = await this.submissionRepository.findLatestSubmissionNumber(taskId);
        const submissionNumber = (latestSubmissionNumber??0) + 1;
        return this.submissionRepository.create({
            task: {
                connect: {
                    id: taskId,
                },
            },
            submittedByUser: {
                connect: {
                    id: submittedBy,
                },
            },
            assignment: {
                connect: {
                    id: data.assignmentId,
                },
            },
            submissionNumber, 
            prUrl: data.prUrl,
            notes: data.notes??null,
        });
    }
    async findSubmissionById(id: bigint): Promise<Submission | null> {
        return this.submissionRepository.findById(id);
    }
}