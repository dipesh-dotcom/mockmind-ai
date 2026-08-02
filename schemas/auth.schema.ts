import {z} from "zod";

export const registerSchema = z.object({
    name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name is too long."),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password is too long.")
    .regex(/[A-Z]/, "Password must contain an uppercase letter.")
    .regex(/[a-z]/, "Password must contain a lowercase letter.")
    .regex(/[0-9]/, "Password must contain a number.")
    .regex(/[^A-Za-z0-9]/, "Password must contain a special character."),
})

export type RegisterInput = z.infer<typeof registerSchema>;