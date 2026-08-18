import { z } from "zod";

export const taskIdSchema = z.object({
  taskId: z.coerce.bigint("taskId must be a valid number"),
});

export type TaskIdDto = z.infer<typeof taskIdSchema>;