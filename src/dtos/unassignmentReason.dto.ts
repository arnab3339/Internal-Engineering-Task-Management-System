import { z } from "zod";

export const reasonIdParamSchema = z.object({
  reasonId: z.coerce.bigint("reasonId must be a valid number"),
});

export const updateUnassignmentReasonSchema = z.object({
  code: z
    .string()
    .min(1, "code is required")
    .max(100, "code must not exceed 100 characters")
    .nullish(),

  label: z
    .string()
    .min(1, "label is required")
    .max(255, "label must not exceed 255 characters")
    .nullish(),

  affectsPerformance: z.boolean("affectsPerformance must be a boolean").nullish(),
});

export type ReasonIdParamDto = z.infer<typeof reasonIdParamSchema>;
export type UpdateUnassignmentReasonDto = z.infer<typeof updateUnassignmentReasonSchema>;