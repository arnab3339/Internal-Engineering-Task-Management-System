import { Submission } from "../../generated/prisma/client.js";
import { ISubmissionRepository } from "../repositories/submission.repository.js";
import { CreateSubmissionDto } from "../dtos/submission.dto.js";
import { Submission } from "../../generated/prisma/client.js";
import { NotfoundError} from "../utils/errors/app.error.js";
import { ITaskRepository } from "../repositories/task.repository.js";
import { TaskStatus } from "../../generated/prisma/client.js";


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
        return await prisma.$transaction(async (tx) => {
            const [task, latestSubmission] = await Promise.all([
                tx.task.findUnique({
                    where: {
                        id: taskId,
                    },
                }),

                tx.submission.findFirst({
                    where: {
                        taskId,
                    },
                    orderBy: {
                        submissionNumber: "desc",
                    },
                }),
            ]);

            if (!task) {
                throw new NotfoundError("Task not found");
            }

            const submissionNumber =
                (latestSubmission?.submissionNumber ?? 0) + 1;

            const submission = await tx.submission.create({
                data: {
                    taskId,
                    submittedBy,
                    assignmentId: data.assignmentId,
                    submissionNumber,
                    prUrl: data.prUrl,
                    notes: data.notes ?? null,
                },
            });

            await tx.task.update({
                where: {
                    id: taskId,
                },
                data: {
                    status: TaskStatus.READY_FOR_REVIEW,
                },
            });

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