import { Submission,Prisma } from "../../generated/prisma/client.js";
import { ISubmissionRepository } from "../repositories/submission.repository.js";
import { CreateSubmissionDto } from "../dtos/submission.dto.js";
import { NotfoundError} from "../utils/errors/app.error.js";
import { ITaskRepository } from "../repositories/task.repository.js";
import { TaskStatus } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

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
    
    async createSubmission(taskId: bigint,submittedBy: bigint,data: CreateSubmissionDto): Promise<Submission> {
        return prisma.$transaction(async (tx) => {
            const [task, latestSubmission] = await Promise.all([
                this.taskRepository.findById(taskId,tx),
                this.submissionRepository.findLatestSubmissionNumber(taskId,tx),
            ]);

        if (!task) {
            throw new NotfoundError("Task not found");
        }
    const submissionNumber = (latestSubmission ?? 0) + 1;

    const submission = await this.submissionRepository.create({
      taskId,
      submittedBy,
      assignmentId: data.assignmentId,
      submissionNumber,
      prUrl: data.prUrl,
      notes: data.notes ?? null,
    },tx
    );

    await this.taskRepository.updateTaskStatus(
        taskId,
        TaskStatus.READY_FOR_REVIEW,
        tx
    );

    return submission;
    });
    }
    
    async findSubmissionById(id: bigint): Promise<Submission | null> {
        return this.submissionRepository.findById(id);
    }

    async findTaskSubmissions(taskId: bigint): Promise<Submission[]> {
        const task = await this.taskRepository.findById(taskId);

        if (!task) {
            throw new NotfoundError("Task not found");
        }

        return this.submissionRepository.findByTaskId(taskId);
    }


}