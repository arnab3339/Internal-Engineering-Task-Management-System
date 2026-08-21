import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/express.js";
import { ICommentService } from "../services/comment.service.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";

export class CommentController {
    private readonly commentService: ICommentService;

    constructor(commentService: ICommentService) {
        this.commentService = commentService;
    }

    async createCommentHandler(req: Request, res: Response, next: NextFunction){
        try {
            const { user } = req as AuthenticatedRequest;
            const taskId = req.params.taskId as string;
            const commentData = req.body;

            const comment = await this.commentService.createComment(BigInt(taskId),user.userId,commentData);

            sendSuccess(res,comment,201,"Comment created successfully");
        } catch (error) {
            next(error);
        }
    }

    async getAllCommentsHandler(req: Request, res: Response, next: NextFunction): Promise<void> {}

    async getCommentHandler(req: Request, res: Response, next: NextFunction): Promise<void> {}

    async updateCommentHandler(req: Request, res: Response, next: NextFunction): Promise<void> {}

    async deleteCommentHandler(req: Request, res: Response, next: NextFunction): Promise<void> {}
}