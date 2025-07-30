import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import LoanDialog from "@/app/(protected)/loans/_components/LoanDialog";
import LoanTable from "@/app/(protected)/loans/_components/LoanTable";

export default async function DashboardPage() {
	
	return (
		<div className="container mx-auto px-4 md:px-6">
			<Card className="w-full max-w-5xl mx-auto">
				<CardHeader>
					<CardTitle className="flex flex-col text-2xl font-bold">Loans</CardTitle>
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
					<LoanDialog />
					<LoanTable />
				</CardContent>
			</Card>
		</div>
	);
}