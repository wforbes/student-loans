import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/app/_actions/user";
import { Routes } from "@/app/_constants/Routes";
import Link from "next/link";
import LoanTotals from "@/app/(protected)/loans/_components/LoanTotals";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
	const user = await getCurrentUser();
	if (!user || !user?.id) {
		redirect(Routes.public.auth.login);
	}
	
	return (
		<div className="container mx-auto px-4 md:px-6">
			<Card className="w-full max-w-5xl mx-auto">
				<CardHeader>
					<CardTitle className="flex flex-col text-2xl font-bold">Dashboard</CardTitle>
					<CardDescription className="flex flex-row text-lg font-normal text-black">
						<div></div>
						<div className="flex flex-col justify-end w-full">
							<LoanTotals />
						</div>
					</CardDescription>
				</CardHeader>
				<CardContent className="px-6 mt-0 border-t-2 border-gray-200">
					{/*<h1> Quick Links (TODO): Upcoming Payments... Loan Progress... Providers...</h1>*/}
					<h1 className="text-lg font-bold my-4">Quick Links</h1>
					<div className="flex flex-row gap-2 mt-5">
						<Button asChild variant="outline">
							<Link href={Routes.protected.loans}>Loans Page</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}