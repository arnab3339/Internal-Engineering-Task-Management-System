import { z } from "zod";

export const createRoleSchema = z.object({
    name: z
        .string()
        .min(1, "Role name is required")
        .max(50, "Role name must not exceed 50 characters"),

    description: z
        .string()
        .max(255, "Description must not exceed 255 characters")
        .optional(),
});