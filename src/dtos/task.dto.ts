import { z } from "zod";

export const taskIdSchema = z.object({
  taskId: z.coerce.bigint("taskId must be a valid number"),
});

export type TaskIdDto = z.infer<typeof taskIdSchema>;

export const createTaskSchema = z.object({
  projectId: z.coerce.bigint("Project ID must be a valid number"),
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().optional(),
  status: z.string().max(50).default("TODO"),
  priority: z.string().max(50).default("MEDIUM"),
  ownerId: z.coerce.bigint("Owner ID must be a valid number").optional(),
  deadline: z.coerce.date("Deadline must be a valid date").optional(),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export const updateTaskSchema = z.object({
  title: z.string().min(1, "Title cannot be empty").max(255).optional(),
  description: z.string().optional(),
  status: z.string().max(50).optional(),
  priority: z.string().max(50).optional(),
  ownerId: z.coerce.bigint("Owner ID must be a valid number").optional(),
  deadline: z.coerce.date("Deadline must be a valid date").optional(),
}).refine(
  function (data) {
    return data.title !== undefined || 
           data.description !== undefined || 
           data.status !== undefined || 
           data.priority !== undefined || 
           data.ownerId !== undefined || 
           data.deadline !== undefined;
  },
  { message: "At least one field must be provided to update" }
);

export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
