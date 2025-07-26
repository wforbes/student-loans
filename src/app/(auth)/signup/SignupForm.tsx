"use client";

import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { signupAction } from "./actions";
import { Button } from "@/components/ui/button";

export default function SignupForm() {

	const [formState, formAction] = useActionState(signupAction, {
		success: false,
	});

	//console.log("formState", formState);
	//console.log("fields returned: ", { ...(formState?.fields ?? {}) });

	return (
		<form action={formAction} className="grid gap-4">
			<div className="grid gap-2">
				<Input
					name="username"
					id="username"
					type="text"
					placeholder="username"
					required
					defaultValue={formState.fields?.username}
				/>
				{formState?.errors?.username && (
					<p className="text-destructive">{formState?.errors?.username}</p>
				)}
			</div>
			<div className="grid gap-2">
				<Input
					name="email"
					id="email"
					type="email"
					placeholder="m@example.com"
					required
					defaultValue={formState.fields?.email}
				/>
				{formState?.errors?.email && (
					<p className="text-destructive">{formState?.errors?.email}</p>
				)}
			</div>
			<div className="grid gap-2">
				<Input
					name="password"
					id="password"
					type="password"
					placeholder="password"
					required
					defaultValue={formState.fields?.password}
				/>
				{formState?.errors?.password && (
					<p className="text-destructive">{formState?.errors?.password}</p>
				)}
			</div>
			<div className="grid gap-2">
				<Input
					name="confirmPassword"
					id="confirmPassword"
					type="password"
					placeholder="confirm password"
					required
					defaultValue={formState.fields?.confirmPassword}
				/>
				{formState?.errors?.confirmPassword && (
					<p className="text-destructive">{formState?.errors?.confirmPassword}</p>
				)}
			</div>
			<div className="grid gap-2">
				<Button type="submit">Sign up</Button>
			</div>
		</form>
	);
}