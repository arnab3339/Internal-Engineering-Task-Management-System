import { z } from "zod";

export const reasonIdParamSchema = z.object({
  reasonId: z.coerce.bigint("reasonId must be a valid number"),
});

export type ReasonIdParamDto = z.infer<typeof reasonIdParamSchema>;