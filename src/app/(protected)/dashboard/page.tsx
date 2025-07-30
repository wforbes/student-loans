import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/app/_actions/user";
import PrototypeStuff from "@/app/_prototype_page";
import { formatCurrency } from "@/lib/utils";
import { Routes } from "@/app/_constants/Routes";
import Link from "next/link";

export default async function DashboardPage() {
	const user = await getCurrentUser();
	
	return (
		<div className="container mx-auto px-4 md:px-6">
			<Card className="w-full max-w-5xl mx-auto">
				<CardHeader>
					<CardTitle className="flex flex-col text-2xl font-bold">Dashboard</CardTitle>
					<CardDescription className="flex flex-row text-lg font-normal text-black">
						<div>Test</div>
						<div className="flex flex-col justify-end w-full">
							<div className="flex justify-end">Total Loans: {formatCurrency(10000)}</div>
							<div className="flex justify-end">Daily Interest: {formatCurrency(100)}</div>
							<div className="flex justify-end">Monthly Interest: {formatCurrency(1000)}</div>
						</div>
					</CardDescription>
				</CardHeader>
				<CardContent className="px-6 mt-0">
					<h1> Quick Links (TODO): Upcoming Payments... Loan Progress... Providers...</h1>
					<div className="flex flex-row gap-2">
						<Link href={Routes.protected.loans}>Loans</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}