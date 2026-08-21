import { z } from "zod";

// implement all the dtos below here
export const createCommentSchema = z.object({
    message: z
        .string()
        .min(1, "Comment message is required")
        .max(5000, "Comment message is too long"),
});

export const commentTaskIdSchema = z.object({
    taskId: z.coerce.bigint("Task ID must be a valid number"),
});

export type CreateCommentDto = z.infer<typeof createCommentSchema>;