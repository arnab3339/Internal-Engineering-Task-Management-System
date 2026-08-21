import { z } from "zod";

export const createReviewSchema = z.object({
  requirementAnalysisScore: z.number().int().min(0).max(10),
  codeQualityScore: z.number().int().min(0).max(10),
  codeCorrectnessScore: z.number().int().min(0).max(10),
  testingScore: z.number().int().min(0).max(10),
  deliveryTimingScore: z.number().int().min(0).max(10),
  prCommitQualityScore: z.number().int().min(0).max(10),
  feedback: z.string().optional(),
  decision: z.enum(["APPROVED", "CHANGES_REQUESTED"]),
});

export type CreateReviewDTO = z.infer<typeof createReviewSchema>;