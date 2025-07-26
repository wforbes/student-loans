"use server";
import "server-only";
import { LoginFormSchema } from "@/db/authSchemas";
import { RepositoryFactory } from "@/db/infra/repositories/RepositoryFactory";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";
import { Routes } from "@/app/_constants/Routes";
import { MESSAGES } from "@/app/_constants";

type FormState = {
	success?: boolean;
	fields?: Record<string, string>;
	errors?: Record<string, string[]>;
}

export async function loginAction(
	prevState: FormState,
	payload: FormData
): Promise<FormState> {
	console.log("payload received", payload);
	if (!(payload instanceof FormData)) {
		return {
			success: false,
			errors: { error: [MESSAGES.FORM_ERROR] },
		};
	}
	const formData = Object.fromEntries(payload);
	console.log("converted object entries to form data", formData);

	const parsed = LoginFormSchema.safeParse(formData);

	if (!parsed.success) {
		const errors = parsed.error.flatten().fieldErrors;
		const fields: Record<string, string> = {};

		for (const key of Object.keys(formData)) {
			fields[key] = formData[key].toString();
		}
		console.log("error returned data", formData);
		console.log("error returned error", errors);
		return {
			success: false,
			fields,
			errors,
		};
	}

	const user = await RepositoryFactory.getUserRepository()
		.getByEmailWithPasshash(parsed.data.email);

	if (!user) {
		console.log("user not found");
		return {
			success: false,
			errors: { email: [MESSAGES.LOGIN_ERROR] },
		};
	}

	const passwordIsValid = await bcrypt.compare(parsed.data.password, user.passhash);
	if (!passwordIsValid) {
		console.log("password is not valid");
		return {
			success: false,
			errors: { email: [MESSAGES.LOGIN_ERROR] },
		};
	}

	const session = await createSession(user.id);
	if (!session?.success) {
		console.log("failed to create session");
		return {
			success: false,
			errors: { error: [MESSAGES.CREATE_SESSION_ERROR] },
		};
	}

	return {
		success: true,
	};
}