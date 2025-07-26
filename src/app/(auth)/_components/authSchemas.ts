import { AUTH_ERRORS } from "@/app/_constants";
import { z } from "zod";

export const SignupFormSchema = z.object({
	username: z.string().min(1, { message: AUTH_ERRORS.USERNAME_REQUIRED }),
	email: z.string().email({ message: AUTH_ERRORS.EMAIL_INVALID }),
	password: z.string().min(8, { message: AUTH_ERRORS.PASSWORD_REQUIRED }),
	confirmPassword: z.string().min(8, { message: AUTH_ERRORS.CONFIRM_PASSWORD_REQUIRED }),
}).refine(
	(data) => data.password === data.confirmPassword,
	{
		message: AUTH_ERRORS.PASSWORD_MISMATCH,
		path: ["confirmPassword"],
	}
);

export type SignupFormSchemaType = z.infer<typeof SignupFormSchema>;

export const LoginFormSchema = z.object({
	email: z.string().email({ message: AUTH_ERRORS.EMAIL_INVALID }),
	password: z.string().min(8, { message: AUTH_ERRORS.PASSWORD_REQUIRED }),
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;