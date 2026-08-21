import { Comment } from "../../generated/prisma/client.js";
import { ICommentRepository } from "../repositories/comment.repository.js";
import { CreateCommentDto } from "../dtos/comment.dto.js";
import { ITaskRepository } from "../repositories/task.repository.js";
import { NotfoundError } from "../utils/errors/app.error.js";

export interface ICommentService {
    createComment(taskId: bigint, userId: bigint,data: CreateCommentDto ): Promise<Comment>;
    getAllComments(): Promise<void>;
    getComment(): Promise<void>
    updateComment(): Promise<void>;
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

    async updateComment(): Promise<void> {}

    async deleteComment(): Promise<void> {}
}