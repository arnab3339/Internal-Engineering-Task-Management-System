import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Invalid email"),

  password: z
    .string()
    .min(1, "password is required"),
});


export const updatePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, "oldPassword is required"),

    newPassword: z
      .string()
      .min(8, "newPassword must be at least 8 characters"),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "newPassword must be different from oldPassword",
    path: ["newPassword"],
  });

export type SignInDto = z.infer<typeof signInSchema>;
export type UpdatePasswordDto = z.infer<typeof updatePasswordSchema>;