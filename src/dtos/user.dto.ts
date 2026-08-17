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
    .min(8, "password must be at least 8 characters")
    .max(72, "password must not exceed 72 characters")
    .regex(/[a-z]/, "password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "password must contain at least one uppercase letter")
    .regex(/[0-9]/, "password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "password must contain at least one special character"),
});

export const userIdSchema = z.object({
  id: z.coerce.bigint("id must be a valid number"),
});

export const updateUserSchema = z.object({
  fullName: z.string().min(1, "fullName cannot be empty").max(150, "fullName must be at most 150 characters").optional(),
  email: z.email("Invalid email").optional(),
  password: z
    .string()
    .min(8, "password must be at least 8 characters")
    .max(72, "password must not exceed 72 characters")
    .regex(/[a-z]/, "password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "password must contain at least one uppercase letter")
    .regex(/[0-9]/, "password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "password must contain at least one special character")
    .optional(),
}).refine(
  (data) => data.fullName !== undefined || data.email !== undefined || data.password !== undefined,
  { message: "At least one field (fullName, email, or password) must be provided" }
);

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type UserIdDto = z.infer<typeof userIdSchema>;