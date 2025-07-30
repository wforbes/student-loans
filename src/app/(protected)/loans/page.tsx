"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import LoanDialog from "@/app/(protected)/loans/_components/LoanDialog";
import LoanTable from "@/app/(protected)/loans/_components/LoanTable";
//import EditLoanDialog from "@/app/(protected)/loans/_components/EditLoanDialog";
import { useLoanQuery } from "@/services/loan/queries";
import { columns } from "./_components/LoanTable/columns";
import { Button } from "@/components/ui/button";
import { Loader2, PencilIcon } from "lucide-react";
import { LoanWithServicer } from "@/db/infra/types/Loan";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";

export default function LoansPage() {

	const { data: loans, isLoading } = useLoanQuery();
	
	const [editLoan, setEditLoan] = useState<LoanWithServicer | null>(null);
	const [editLoanOpen, setEditLoanOpen] = useState(false);
	
	// add actions column for the loan table
	const columnHelper = createColumnHelper<LoanWithServicer>();
	const displayColumns = [
		columnHelper.display({
			header: "Actions",
			cell: ({ row }) => {
				return (
					<div className="flex">
						<Button variant="outline" size="icon" onClick={() => handleEdit(row.original)}>
							<PencilIcon className="w-4 h-4" />
						</Button>
					</div>
				);
			}
		}),
		...columns
	]
	
	const handleEdit = (loan: LoanWithServicer) => {
		setEditLoan(loan);
		setEditLoanOpen(true);
	}

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
					<LoanDialog editLoan={editLoan} open={editLoanOpen} setOpen={setEditLoanOpen} />
					{/*<EditLoanDialog editLoan={editLoan} open={editLoanOpen} setOpen={setEditLoanOpen} /> */}
					<div className="mt-4">
						{
							isLoading ? (
								<Card className="flex justify-center items-center h-full">
									<CardContent className="flex flex-col justify-center items-center h-full">
										<Loader2 className="w-10 h-10 animate-spin" />
										<p className="text-lg font-bold mt-4">Loading...</p>
									</CardContent>
								</Card>
							) : (
								<LoanTable columns={displayColumns} data={loans || []} />
							)
						}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}