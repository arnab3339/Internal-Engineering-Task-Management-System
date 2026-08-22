import { Comment, Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../configs/db.config.js";

export interface ICommentRepository {
    create(data: Prisma.CommentCreateInput): Promise<Comment>;
    getAll(): Promise<Comment[]>;
    get(id: bigint): Promise<Comment|null>;
    update(id: bigint, data: Prisma.CommentUpdateInput): Promise<Comment>;
    delete(id: bigint): Promise<void>;
}

export class CommentRepository implements ICommentRepository {
    async create(data: Prisma.CommentCreateInput): Promise<Comment> {
        return prisma.comment.create({
            data,
        });
    }
    async getAll(): Promise<Comment[]> {}

    async get(id: bigint): Promise<Comment|null> {
        return prisma.comment.findUnique({
            where: {
                id,
            },
        });
    }

    async update(id: bigint, data: Prisma.CommentUpdateInput): Promise<Comment> {
        return prisma.comment.update({
            where: {
                id,
            },
            data,
        });
    }
    

    async delete(id: bigint): Promise<void> {}
}