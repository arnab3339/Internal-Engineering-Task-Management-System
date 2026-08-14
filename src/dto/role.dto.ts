import { z } from "zod";

export const createRoleSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().max(255).optional(),
});

export type CreateRoleDto = z.infer<typeof createRoleSchema>;