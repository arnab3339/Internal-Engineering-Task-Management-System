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
        const[task,latestSubmissionNumber]=await Promise.all([
            this.taskRepository.findById(taskId),
            this.submissionRepository.findLatestSubmissionNumber(taskId),
        ]);
        if(!task){
            throw new NotfoundError("Task not found");
        }
        const submissionNumber = (latestSubmissionNumber?.submissionNumber ?? 0) + 1;
            return this.submissionRepository.create({
                taskId,
                submittedBy,
                assignmentId: data.assignmentId,
                submissionNumber,
                prUrl: data.prUrl,
                notes: data.notes ?? null,
            });
    }
    async findSubmissionById(id: bigint): Promise<Submission | null> {
        return this.submissionRepository.findById(id);
    }
}