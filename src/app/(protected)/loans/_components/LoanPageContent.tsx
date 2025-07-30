"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoanDialog from "@/app/(protected)/loans/_components/LoanDialog";
import LoanTable from "@/app/(protected)/loans/_components/LoanTable";
//import EditLoanDialog from "@/app/(protected)/loans/_components/EditLoanDialog";
import { useLoanQuery } from "@/services/loan/queries";
import { columns } from "@/app/(protected)/loans/_components/LoanTable/columns";
import { Button } from "@/components/ui/button";
import { Loader2, PencilIcon, TrashIcon } from "lucide-react";
import { LoanWithServicer } from "@/db/infra/types/Loan";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import DeleteLoanDialog from "@/app/(protected)/loans/_components/LoanDialog/DeleteLoanDialog";

export default function LoanPageContent() {
	const { data: loans, isLoading } = useLoanQuery();
	
	const [editLoan, setEditLoan] = useState<LoanWithServicer | null>(null);
	const [editLoanOpen, setEditLoanOpen] = useState(false);
	const [deleteLoan, setDeleteLoan] = useState<LoanWithServicer | null>(null);
	const [deleteLoanOpen, setDeleteLoanOpen] = useState(false);
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
						<Button variant="outline" size="icon" onClick={() => handleDelete(row.original)}>
							<TrashIcon className="w-4 h-4" />
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

	const handleDelete = (loan: LoanWithServicer) => {
		setDeleteLoan(loan);
		setDeleteLoanOpen(true);
	}

	return (
		<>
			<LoanDialog editLoan={editLoan} open={editLoanOpen} setOpen={setEditLoanOpen} />
			<DeleteLoanDialog loanToDelete={deleteLoan} open={deleteLoanOpen} setOpen={setDeleteLoanOpen} />
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
		</>
	)
}