"use server";
import "server-only";
import { SignupFormSchema } from "@/app/(auth)/_components/authSchemas";
import { RepositoryFactory } from "@/db/infra/repositories/RepositoryFactory";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";
import { Routes } from "@/app/_constants/Routes";
import { AUTH_ERRORS } from "@/app/_constants";

type FormState = {
	success?: boolean;
	fields?: Record<string, string>;
	errors?: Record<string, string[]>;
}

export async function signupAction(
	prevState: FormState,
	payload: FormData
): Promise<FormState> {
	//console.log("payload received", payload);
	if (!(payload instanceof FormData)) {
		return {
			success: false,
			errors: { error: [AUTH_ERRORS.INVALID_FORM_DATA] },
		};
	}
	const formData = Object.fromEntries(payload);
	//console.log("converted object entries to form data", formData);

	const parsed = SignupFormSchema.safeParse(formData);

	if (!parsed.success) {
		const errors = parsed.error.flatten().fieldErrors;
		const fields: Record<string, string> = {};

		for (const key of Object.keys(formData)) {
			fields[key] = formData[key].toString();
		}
		//console.log("error returned data", formData);
		//console.log("error returned error", errors);
		return {
			success: false,
			fields,
			errors,
		};
	}

	const emailTaken = await RepositoryFactory.getUserRepository()
		.existsByEmail(parsed.data.email);
	if (emailTaken) {
		return {
			success: false,
			errors: { email: [AUTH_ERRORS.EMAIL_TAKEN] },
			fields: parsed.data,
		};
	}

	const usernameTaken = await RepositoryFactory.getUserRepository()
		.existsByUsername(parsed.data.username);
	if (usernameTaken) {
		return {
			success: false,
			errors: { username: [AUTH_ERRORS.USERNAME_TAKEN] },
			fields: parsed.data,
		};
	}

	if (parsed.data.password !== parsed.data.confirmPassword) {
		return {
			success: false,
			errors: { password: [AUTH_ERRORS.PASSWORD_MISMATCH] },
			fields: parsed.data,
		};
	}

	//console.log("parsed data", parsed.data);

	const passedHashword = await bcrypt.hash(parsed.data.password, 10);
	const user = await RepositoryFactory.getUserRepository()
		.create({
			id: crypto.randomUUID(),
			username: parsed.data.username,
			email: parsed.data.email,
			passhash: passedHashword, // dont judge my naming conventions sir
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		});

	//console.log("user created", user);

	const session = await createSession(user.id, Routes.protected.dashboard);
	if (!session?.success) {
		//console.log("failed to create session");
		return {
			success: false,
			errors: { error: [AUTH_ERRORS.CREATE_SESSION_FAILED] },
		};
	}

	return {
		success: true,
	};
}