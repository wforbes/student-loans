"use client"

import { useState } from "react"

import {
	Card,
	CardTitle,
	CardDescription,
	CardHeader,
	CardContent
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { z } from "zod"

import { columns, Loan } from "@/components/LoanTable/columns"
import LoanTable from "@/components/LoanTable"
import { formatCurrency } from "@/lib/utils"
import LoanDialog, { FormSchema } from "@/components/LoanDialog"
import ExtraPaymentDialog, { Payment, FormSchema as ExtraPaymentFormSchema } from "@/components/ExtraPaymentDialog"
import { appTitle } from "./_constants"


export default function Home() {

	const [loanData, setLoanData] = useState<Loan[]>()
	const [payments, setPayments] = useState<Payment[]>()
	const [showExtraPayments, setShowExtraPayments] = useState(false)


	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		if (loanData?.find(loan => loan.id === data.id)) {
			alert("Loan ID already exists")
			return
		}
		setLoanData([...(loanData || []), {
			id: data.id,
			principle: parseFloat(data.principle),
			interestRate: parseFloat(data.interestRate),
			dateOpened: data.dateOpened
		}])
	}

	const onSubmitExtraPayment = (data: z.infer<typeof ExtraPaymentFormSchema>) => {
		setPayments([...(payments || []), {
			amount: parseFloat(data.amount),
			loanId: data.loanId
		}])
	}
	const calculateDailyInterest = (interestRate: number, principle: number) => {
		return (interestRate / 100) / 365 * principle;
	}

	const calculateMonthlyInterest = (interestRate: number, principle: number) => {
		return (interestRate / 100) / 365 * 30 * principle;
	}

	const getExtraPaymentMonthlyInterestDiff = () => {
		let totalMonthlyInterestDiff = 0;
		// for each loan, find any extra payments that are proposed for it in the payments array
		// if there are none, continue to the next loan
		// otherwise, find the difference between the current monthly interest for the loan and the monthly interest after the proposed extra payments are applied to it 
		// finally, add that difference to the totalMonthlyInterestDiff
		// once all loans are processed, return the totalMonthlyInterestDiff
		for (const loan of loanData || []) {
			const extraPayments = payments?.filter(payment => payment.loanId === loan.id);
			if (extraPayments?.length) {
				const currentMonthlyInterest = calculateMonthlyInterest(loan.interestRate, loan.principle);
				const proposedMonthlyInterest = calculateMonthlyInterest(loan.interestRate, loan.principle - extraPayments.reduce((acc, payment) => acc + payment.amount, 0));
				totalMonthlyInterestDiff += currentMonthlyInterest - proposedMonthlyInterest;
			}
		}
		return totalMonthlyInterestDiff;
	}

	const getMonthlyInterestWithExtraPayments = () => {
		const extraPaymentsDiff = getExtraPaymentMonthlyInterestDiff();
		const currentMonthlyInterest = loanData?.reduce((acc, loan) => acc + calculateMonthlyInterest(loan.interestRate, loan.principle), 0) || 0;
		return currentMonthlyInterest - extraPaymentsDiff;
	}

	const getExtraPaymentDailyInterestDiff = () => {
		let totalDailyInterestDiff = 0;
		for (const loan of loanData || []) {
			const extraPayments = payments?.filter(payment => payment.loanId === loan.id);
			if (extraPayments?.length) {
				const currentDailyInterest = calculateDailyInterest(loan.interestRate, loan.principle);
				const proposedDailyInterest = calculateDailyInterest(loan.interestRate, loan.principle - extraPayments.reduce((acc, payment) => acc + payment.amount, 0));
				totalDailyInterestDiff += currentDailyInterest - proposedDailyInterest;
			}
		}
		return totalDailyInterestDiff;
	}

	const getDailyInterestWithExtraPayments = () => {
		const extraPaymentsDiff = getExtraPaymentDailyInterestDiff();
		const currentDailyInterest = loanData?.reduce((acc, loan) => acc + calculateDailyInterest(loan.interestRate, loan.principle), 0) || 0;
		return currentDailyInterest - extraPaymentsDiff;
	}

	const getTotalExtraPaymentAmount = () => {
		return payments?.reduce((acc, payment) => acc + payment.amount, 0) || 0;
	}

	const getTotalPrincipleWithExtraPayments = () => {
		return (loanData?.reduce((acc, loan) => acc + loan.principle, 0) || 0) - getTotalExtraPaymentAmount();
	}

	return (
		<div className="container mx-auto px-4 md:px-6 pt-10">
			<div className="w-full max-w-3xl mx-auto space-y-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl font-bold flex flex-row justify-between items-center">
							{appTitle}
							<div className="flex justify-end">

							</div>
						</CardTitle>
						<CardDescription className="flex flex-col gap-2">
							
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-2">
						<Card>
							<CardHeader>
								<CardTitle>Current Loan Details</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex flex-row gap-2">
									<div className="flex flex-col gap-2 w-1/2 text-xs text-muted-foreground">
										<div className="flex flex-row justify-between">
											<p>Total Principle:</p>
											<p>{formatCurrency(loanData?.reduce((acc, loan) => acc + loan.principle, 0) || 0)}</p>
										</div>
										<div className="flex flex-row justify-between">
											<p>Daily Interest:</p>
											<p>{formatCurrency(loanData?.reduce((acc, loan) => acc + calculateDailyInterest(loan.interestRate, loan.principle), 0) || 0)}</p>
										</div>
										<div className="flex flex-row justify-between">
											<p>Monthly Interest:</p>
											<p>{formatCurrency(loanData?.reduce((acc, loan) => acc + calculateMonthlyInterest(loan.interestRate, loan.principle), 0) || 0)}</p>
										</div>
									</div>
									<div className="flex flex-col bg-black">-</div>
									<div className="flex flex-col w-1/2">
									</div>
								</div>
							</CardContent>
						</Card>
						<div className="flex flex-row justify-between mt-2">
							<Button variant="outline" onClick={() => setShowExtraPayments(!showExtraPayments)}>
								{showExtraPayments ? "Hide Extra Payments" : "Show Extra Payments"}
							</Button>
							<LoanDialog onSubmit={onSubmit} />
						</div>
						{showExtraPayments &&<Card>
								<CardHeader>
									<CardTitle className="flex flex-row justify-between items-center">
										<div>Plan Extra Payments</div>
										<ExtraPaymentDialog payments={payments || []} loans={loanData || []} onSubmit={onSubmitExtraPayment} />
									</CardTitle>
									<CardDescription>
										Plan extra payments to see the effects on principle and interest.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="flex flex-row gap-2">
										<div className="flex flex-col gap-2 w-1/2 text-xs text-muted-foreground">
											<div className="flex flex-row justify-between">
												<p>Total Principle:</p>
												<p>
													{
														formatCurrency(loanData?.reduce((acc, loan) => acc + loan.principle, 0) || 0)
													}
													{payments?.length && payments?.length > 0 &&
													<span className="text-green-500 font-bold"> (-{formatCurrency(getTotalExtraPaymentAmount())}) ➡️ {formatCurrency(getTotalPrincipleWithExtraPayments())}</span>}
												</p>
												
											</div>
											<div className="flex flex-row justify-between">
												<p>Daily Interest:</p>
												<p>
													{formatCurrency(loanData?.reduce((acc, loan) => acc + calculateDailyInterest(loan.interestRate, loan.principle), 0) || 0)}
													{payments?.length && payments?.length > 0 &&
													<span className="text-green-500 font-bold"> (-{formatCurrency(getExtraPaymentDailyInterestDiff())}) ➡️ {formatCurrency(getDailyInterestWithExtraPayments())}</span>}
												</p>
											</div>
											<div className="flex flex-row justify-between">
												<p>Monthly Interest:</p>
												<p>
													{formatCurrency(loanData?.reduce((acc, loan) => acc + calculateMonthlyInterest(loan.interestRate, loan.principle), 0) || 0)}
													{payments?.length && payments?.length > 0 &&
													<span className="text-green-500 font-bold"> (-{formatCurrency(getExtraPaymentMonthlyInterestDiff())}) ➡️ {formatCurrency(getMonthlyInterestWithExtraPayments())}</span>}
												</p>
											</div>
										</div>
										<div className="flex flex-col bg-black">-</div>
										<div className="flex flex-col w-1/2">
											<div className="text-xs text-muted-foreground">
												{!payments || !payments?.length ? <p>Hint: Try clicking &apos;Manage Extra Payments&apos; to add an extra payment
													and see it&apos;s effects on your principle and interest paid.</p>
													: (<>
														<p>You added {payments?.length} extra payment{payments?.length === 1 ? "" : "s"}
															&nbsp;for a total of {formatCurrency(payments?.reduce((acc, payment) => acc + payment.amount, 0) || 0)}.
														</p>
														<p>They would reduce your interest paid by {formatCurrency(getExtraPaymentMonthlyInterestDiff())} per month!</p>
													</>)
												}
											</div>
											<div className="flex flex-row justify-center mt-2">
												
											</div>
										</div>
									</div>
								</CardContent>
							</Card>}
						<LoanTable
							columns={columns}
							data={loanData || []}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
