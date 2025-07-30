"use client";

import { LoanWithServicer } from "@/db/infra/types/Loan";
import { formatCurrency } from "@/lib/utils";
import { useLoanQuery } from "@/services/loan/queries";

export default function LoanTotals() {
	const { data: loanData } = useLoanQuery();

	const getTotalPrinciple = () => {
		return loanData?.reduce((acc: number, loan: LoanWithServicer) => acc + loan.principle, 0) || 0;
	}

	const getTotalDailyInterest = () => {
		return loanData?.reduce((acc: number, loan: LoanWithServicer) => acc + calculateDailyInterest(loan.interestRate, loan.principle), 0) || 0;
	}

	const calculateDailyInterest = (interestRate: number, principle: number) => {
		return (interestRate / 100) / 365 * principle;
	}

	const getTotalMonthlyInterest = () => {
		return loanData?.reduce((acc: number, loan: LoanWithServicer) => acc + calculateMonthlyInterest(loan.interestRate, loan.principle), 0) || 0;
	}

	const calculateMonthlyInterest = (interestRate: number, principle: number) => {
		return (interestRate / 100) / 365 * 30 * principle;
	}

	return (
		<div>
			<div className="flex justify-end">Total Loans: {formatCurrency(getTotalPrinciple())}</div>
			<div className="flex justify-end">Daily Interest: {formatCurrency(getTotalDailyInterest())}</div>
			<div className="flex justify-end">Monthly Interest: {formatCurrency(getTotalMonthlyInterest())}</div>
		</div>
	)
}