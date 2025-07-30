import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoanTotals from "./_components/LoanTotals";
import LoanPageContent from "./_components/LoanPageContent";
import { getCurrentUser } from "@/app/_actions/user";
import { redirect } from "next/navigation";
import { Routes } from "@/app/_constants/Routes";

export default async function LoansPage() {
	const user = await getCurrentUser();
	if (!user || !user?.id) {
		redirect(Routes.public.auth.login);
	}

	return (
		<div className="container mx-auto px-4 md:px-6">
			<Card className="w-full max-w-5xl mx-auto">
				<CardHeader>
					<CardTitle className="flex flex-col text-2xl font-bold">Loans</CardTitle>
					<CardDescription className="flex flex-row text-lg font-normal text-black">
						<div></div>
						<div className="flex flex-col justify-end w-full">
							<LoanTotals />
						</div>
					</CardDescription>
				</CardHeader>
				<CardContent className="px-6 mt-0">
					<LoanPageContent />
				</CardContent>
			</Card>
		</div>
	);
}