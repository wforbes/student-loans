"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {

	const [formState, formAction] = useActionState(loginAction, {
		success: false,
	});

	return (
		<form action={formAction} className="grid gap-4">
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
				<Button type="submit">Login</Button>
			</div>
		</form>
	)

}