import { appTitle } from "@/app/_constants";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CenterLayout from "@/app/(auth)/_components/CenterLayout";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
	//const { redirect } = await params;
	return (
		<CenterLayout>
			<div className="flex-1 flex items-center justify-center">
				<div className="w-full max-w-[350px] mx-auto space-y-6 px-4">
					<div className="flex flex-col space-y-2 text-center">
						<Link href="/">
							<div className="flex items-center justify-center gap-2">
								<h1 className="text-2xl font-semibold tracking-tight">
									{appTitle}
								</h1>
							</div>
						</Link>
						<p className="text-sm text-muted-foreground">
							Welcome back! Sign in to your account
						</p>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Login</CardTitle>
							<CardDescription>
								Enter your credentials below to sign in
							</CardDescription>
						</CardHeader>
						<CardContent>
							<LoginForm />
						</CardContent>
					</Card>
					<div className="text-center text-sm text-muted-foreground">
						Don&apos;t have an account?{" "}
						<Link
							href="/signup"
							className="underline underline-offset-4 hover:text-primary"
						>
							Sign Up
						</Link>
					</div>
				</div>
			</div>
		</CenterLayout>
	)
}