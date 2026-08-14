import { z } from "zod";

export const signupSchema = z.object({
  fullName: z
    .string()
    .min(1, "fullName is required")
    .max(150, "fullName must not exceed 150 characters"),

  email: z
    .string()
    .email("Invalid email"),

  password: z
    .string()
    .min(8, "password must contain at least 8 characters"),
});

export type SignupDto = z.infer<typeof signupSchema>;