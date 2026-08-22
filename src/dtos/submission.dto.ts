import { z } from "zod";

export const createSubmissionSchema = z.object({
<<<<<<< HEAD
  assignmentId: z.coerce.bigint("Assignment ID must be a valid number"),
  prUrl: z.string().url("PR URL must be a valid URL").max(500),
  notes: z.string().optional(),
});

export type CreateSubmissionDto = z.infer<typeof createSubmissionSchema>;

export const submissionIdSchema = z.object({
  submissionId: z.coerce.bigint("Submission ID must be a valid number"),
});
=======
    prUrl: z
        .string()
        .url("Must be a valid URL")
        .max(500, "PR URL must not exceed 500 characters"),
    
    notes: z
        .string()
        .nullish() 
});

export const submissionIdSchema = z.object({
    submissionId: z.coerce.bigint("submissionId must be a valid number"),
});

export type CreateSubmissionDto = z.infer<typeof createSubmissionSchema>;
>>>>>>> developer
