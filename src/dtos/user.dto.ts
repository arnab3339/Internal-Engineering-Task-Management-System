import { z } from "zod";

export const createUserSchema = z.object({
  fullName: z
    .string()
    .min(1, "fullName is required")
    .max(150, "fullName must not exceed 150 characters"),

  email: z
    .email("Invalid email"),

  password: z
    .string()
    .min(8, "password must contain at least 8 characters"),
});

export type SignupDto = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  fullName: z.string().min(1, "fullName cannot be empty").max(150, "fullName must be at most 150 characters").nullish(),
  email: z.email("Invalid email").nullish(),
  password: z.string().min(8, "password must contain at least 8 characters").nullish(),
}).refine(
  (data) => data.fullName !== undefined || data.email !== undefined || data.password !== undefined,
  { message: "At least one field (fullName, email, or password) must be provided" }
);

export type UpdateUserDto = z.infer<typeof updateUserSchema>;