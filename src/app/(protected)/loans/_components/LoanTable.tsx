"use client";
import { useLoanQuery } from "@/services/loan/queries";
import { SelectLoan } from "@/db/infra/types/Loan";

export default function LoanTable() {
	const { data: loans } = useLoanQuery();

	return (
		<div className="mt-4">
			<h1>Loan Table</h1>
			<ul>
				{loans && loans.map((loan: SelectLoan) => (
					<li key={loan.id}>{loan.nickname}</li>
				))}
			</ul>
		</div>
	)
}