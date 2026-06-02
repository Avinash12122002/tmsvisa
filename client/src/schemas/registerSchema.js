import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name is too long")
      .regex(/^[A-Za-z\s]+$/, "Name should contain only letters"),

    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Please enter a valid email"),

    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain one uppercase letter")
      .regex(/[a-z]/, "Must contain one lowercase letter")
      .regex(/[0-9]/, "Must contain one number")
      .regex(/[^A-Za-z0-9]/, "Must contain one special character"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })

  .refine(
    (data) => data.password === data.confirmPassword,

    {
      message: "Passwords do not match",

      path: ["confirmPassword"],
    },
  );
