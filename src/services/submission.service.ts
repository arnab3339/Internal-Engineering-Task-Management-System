import { ISubmissionRepository } from "../repositories/submission.repository.js";
import { CreateSubmissionDto } from "../dtos/submission.dto.js";
import { Submission } from "../../generated/prisma/client.js";

export interface ISubmissionService {
    createSubmission(taskId: bigint, submittedBy: bigint, data: CreateSubmissionDto): Promise<Submission>; 
}
export class SubmissionService implements ISubmissionService {
    private readonly submissionRepository: ISubmissionRepository;

    constructor(submissionRepository: ISubmissionRepository) {
        this.submissionRepository = submissionRepository;
    }
    
    async createSubmission(taskId: bigint, submittedBy: bigint, data: CreateSubmissionDto): Promise<Submission> {
        const latestSubmissionNumber = await this.submissionRepository.findLatestSubmissionNumber(taskId);
        const submissionNumber = latestSubmissionNumber + 1;
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
}