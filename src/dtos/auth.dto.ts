import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Invalid email"),

  password: z
    .string()
    .min(1, "password is required"),
});

export type SignInDto = z.infer<typeof signInSchema>;


export const updatePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(1, "oldPassword is required"),

  newPassword: z
    .string()
    .min(6, "newPassword must be at least 6 characters"),
});

export type UpdatePasswordDto = z.infer<typeof updatePasswordSchema>;