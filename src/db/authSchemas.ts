import { z } from "zod";

export const SignupFormSchema = z.object({
	username: z.string().min(1, { message: "Username is required" }),
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string().min(8, { message: "Password must be at least 8 characters" }),
	confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export type SignupFormSchemaType = z.infer<typeof SignupFormSchema>;

export const LoginFormSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;