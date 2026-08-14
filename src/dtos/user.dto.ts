import { z } from "zod";

export const createUserSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required"),

  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(
      8,
      "Password must be at least 8 characters long"
    ),
});

export type SignupDto =
  z.infer<typeof createUserSchema>;