import { z } from "zod";
import { ProjectStatus } from "../../generated/prisma/enums.js";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, "name is required")
    .max(200, "name must not exceed 200 characters"),

  description: z
    .string()
    .max(65535, "description must not exceed 65535 characters")
    .optional(),

  status: z
    .enum(ProjectStatus)
    .optional(),

  startDate: z
    .string()
    .date("startDate must be a valid date")
    .optional(),

  targetEndDate: z
    .string()
    .date("targetEndDate must be a valid date")
    .optional(),
});

export type CreateProjectDto = z.infer<typeof createProjectSchema>;
export const updateProjectSchema = z.object({
  name: z
    .string()
    .min(1, "name is required")
    .max(200, "name must not exceed 200 characters")
    .optional(),

  description: z
    .string()
    .max(65535, "description must not exceed 65535 characters")
    .nullable()
    .optional(),

  startDate: z
    .string()
    .date("startDate must be a valid date")
    .nullable()
    .optional(),

  targetEndDate: z
    .string()
    .date("targetEndDate must be a valid date")
    .nullable()
    .optional(),
});

export type UpdateProjectDto = z.infer<typeof updateProjectSchema>;