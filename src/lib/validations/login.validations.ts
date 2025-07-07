import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid Email ID")
    .min(1, "Email is required.")
    .max(50, "Max 50 characters allowed."),

  password: z
    .string()
    .min(1, "Password is required.")
    .max(50, "Max 50 characters allowed."),
});
