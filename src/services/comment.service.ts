import { Comment } from "../../generated/prisma/client.js";
import { ICommentRepository } from "../repositories/comment.repository.js";
import { CreateCommentDto } from "../dtos/comment.dto.js";
import { ITaskRepository } from "../repositories/task.repository.js";
import { NotfoundError } from "../utils/errors/app.error.js";
import { UpdateCommentDto } from "../dtos/comment.dto.js";
import { ForbiddenError } from "../utils/errors/app.error.js";

export interface ICommentService {
    createComment(taskId: bigint, userId: bigint,data: CreateCommentDto ): Promise<Comment>;
    getAllComments(): Promise<void>;
    getComment(): Promise<void>
    updateComment(commentId: bigint, userId: bigint, data: UpdateCommentDto): Promise<Comment>;
    deleteComment(): Promise<void>;
}

export class CommentService implements ICommentService {
    private readonly commentRepository: ICommentRepository;
    private readonly taskRepository: ITaskRepository;
    constructor(commentRepository: ICommentRepository,taskRepository: ITaskRepository) {
        this.commentRepository = commentRepository;
        this.taskRepository = taskRepository;
    }

    async createComment(taskId: bigint, userId: bigint,data: CreateCommentDto): Promise<Comment> {
        const task = await this.taskRepository.findById(taskId);

        if (!task) {
            throw new NotfoundError("Task not found");
        }

        return this.commentRepository.create({
            task: {
                connect: {
                    id: taskId,
                },
            },
            user: {
                connect: {
                    id: userId,
                },
            },
            message: data.message,
        });
    }
    

    async getAllComments(): Promise<void> {}

    async getComment(): Promise<void> {}

    async updateComment(commentId: bigint, userId: bigint, data: UpdateCommentDto): Promise<Comment> {
        const comment = await this.commentRepository.get(commentId);
        if (!comment) {
            throw new NotfoundError("Comment not found");
        }

        if (comment.userId !== userId) {
            throw new ForbiddenError("You can only edit your own comment");
        }

        return this.commentRepository.update(commentId, {
            message: data.message,
        });
    }

    async deleteComment(): Promise<void> {}
}