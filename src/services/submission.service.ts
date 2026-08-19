import { ISubmissionRepository } from "../repositories/submission.repository.js";

export interface ISubmissionService {
    createSubmission(): Promise<void>; // populate parametrs and return type with using dto
}

export class SubmissionService implements ISubmissionService {
    private readonly submissionRepository: ISubmissionRepository;

    constructor(submissionRepository: ISubmissionRepository) {
        this.submissionRepository = submissionRepository;
    }
    
    async createSubmission(): Promise<void> {
        // implement properly
    }
}