import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { appTitle } from "@/app/_constants";
import CenterLayout from "@/app/_components/CenterLayout";
import SignupForm from "./SignupForm";

export default function SignupPage() {
	return (
		<CenterLayout>
			<div className="flex flex-col space-y-2 text-center">
				<h1 className="text-2xl font-bold">
					{appTitle}
				</h1>
				<p className="text-sm text-muted-foreground">
					Create an account to get started
				</p>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Sign Up</CardTitle>
					<CardDescription>
						Enter your details below to create your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<SignupForm />
				</CardContent>
			</Card>
			<div className="text-center text-sm text-muted-foreground">
				Already have an account?{" "}
				<Link
					href="/login"
					className="underline underline-offset-4 hover:text-primary"
				>
					Login
				</Link>
			</div>
		</CenterLayout>
	)
}