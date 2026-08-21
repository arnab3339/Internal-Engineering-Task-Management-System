import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../utils/helpers/response.helper.js";
import { ISubmissionService } from "../services/submission.service.js";
import { AuthenticatedRequest } from "../types/express.js";
export class SubmissionController {
    private readonly submissionService: ISubmissionService; 

    constructor(submissionService: ISubmissionService) {
        this.submissionService = submissionService;
    }
    async createSubmissionHandler(req: Request, res: Response, next: NextFunction) {
        try {
            const { user } = req as AuthenticatedRequest;
            const taskId = BigInt(req.params.taskId as string);
            const submissionData = req.body;

            const submission = await this.submissionService.createSubmission(BigInt(taskId),user.userId,submissionData);

            sendSuccess(res, submission, 201, "Submission created successfully");
        } catch (error) {
            next(error);
        }
    }
    async getSubmissionByIdHandler(req: Request, res: Response, next: NextFunction) {
        try {
            const submissionId = BigInt(req.params.submissionId as string);

            const submission = await this.submissionService.findSubmissionById(BigInt(submissionId));

            sendSuccess(res, submission, 200, "Submission fetched successfully");
        } catch (error) {
            next(error);
        }
    }
}