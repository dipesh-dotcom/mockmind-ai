import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .email("Please enter a valid email")
    .transform((value) => value.toLowerCase().trim()),

  password: z.string().min(1, "Password is required"),

  rememberMe: z.boolean().optional(),
});

export type SignInSchema = z.infer<typeof signInSchema>;
