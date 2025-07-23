"use client"

import { useState } from "react"

import {
	Card,
	CardTitle,
	CardDescription,
	CardHeader,
	CardContent
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"

import { columns, Loan } from "@/components/LoanTable/columns"
import LoanTable from "@/components/LoanTable"
import { formatCurrency } from "@/lib/utils"

const FormSchema = z.object({
	id: z.string().min(1, {
		message: "Loan ID must be at least 2 characters.",
	}),
	principle: z.string().transform((str) => {
		const num = parseFloat(str.toString());
		if (isNaN(num)) {
			return "";
		}
		// ensure number has 2 decimal places
		return num.toFixed(2);
	})
		.refine(val => parseFloat(val) > 0, { message: 'Money amount must be greater than 0' }),
	interestRate: z.string().refine(
		(value) => {
			const numStr = value.toString();
			const decimalPart = numStr.split('.')[1];
			return !decimalPart || decimalPart.length <= 3;
		},
		{
			message: 'Rate must have at most 3 decimal places',
		}
	),
	dateOpened: z.string().transform((dateString, ctx) => {
		const date = new Date(dateString);
		if (isNaN(date.getTime())) {
			/*ctx.addIssue({
			  code: "invalid_format",
			  message: 'Invalid date format',
			});*/
			return z.NEVER; // Important: Return something to satisfy the return type of transform
		}
		// return format YYYY-MM-DD
		return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
	})
})

type Payment = {
	date: string
	amount: number
}

export default function Home() {

	const [loanData, setLoanData] = useState<Loan[]>()
	const [payments, setPayments] = useState<Payment[]>()

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			id: "",
			principle: "",
			interestRate: "0.0",
			dateOpened: ""
		}
	})

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
		form.reset()
	}

	const calculateDailyInterest = (interestRate: number, principle: number) => {
		return (interestRate / 100) / 365 * principle;
	}

	const calculateMonthlyInterest = (interestRate: number, principle: number) => {
		return (interestRate / 100) / 365 * 30 * principle;
	}

	return (
		<div className="container mx-auto px-4 md:px-6 pt-10">
			<div className="w-full max-w-3xl mx-auto space-y-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl font-bold flex flex-row justify-between items-center">
							Student Loans
							<div className="flex justify-end">

							</div>
						</CardTitle>
						<CardDescription className="flex flex-col gap-2">
							<Card>
								<CardHeader>
									<CardTitle>Plan Extra Payments</CardTitle>
									<CardDescription>
										Plan extra payments to see the effects on interest paid.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="flex flex-row gap-2">
										<div className="flex flex-col w-1/2">
											{payments && payments?.map((payment) => (
												<Card key={payment.date}>
													<CardContent>
														<p>{payment.date}</p>
														<p>{formatCurrency(payment.amount)}</p>
													</CardContent>
												</Card>
											))}
											{!payments && <p>No payments yet</p>}
										</div>
										<div className="flex flex-col bg-black">-</div>
										<div className="flex flex-col gap-2 w-1/2">
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
									</div>


								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Add Loan</CardTitle>
									<CardDescription>
										Add a new loan to the table.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Form {...form}>
										<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row gap-2">
											<div className="flex flex-row gap-2">
												<FormField
													control={form.control}
													name="id"
													render={
														({ field }) => (
															<FormItem>
																<FormLabel>ID</FormLabel>
																<FormControl>
																	<Input placeholder="ID #" {...field} />
																</FormControl>
																<FormDescription></FormDescription>
																<FormMessage />
															</FormItem>
														)
													}
												/>
												<FormField
													control={form.control}
													name="principle"
													render={
														({ field }) => (
															<FormItem>
																<FormLabel>Principle</FormLabel>
																<FormControl>
																	<Input placeholder="Current Principle" {...field} />
																</FormControl>
																<FormDescription></FormDescription>
																<FormMessage />
															</FormItem>
														)
													}
												/>
											</div>
											<div className="flex flex-row gap-2">
												<FormField
													control={form.control}
													name="interestRate"
													render={
														({ field }) => (
															<FormItem>
																<FormLabel>Interest Rate</FormLabel>
																<FormControl>
																	<Input placeholder="Interest Rate" {...field} />
																</FormControl>
																<FormDescription></FormDescription>
																<FormMessage />
															</FormItem>
														)
													}
												/>
												<FormField
													control={form.control}
													name="dateOpened"
													render={
														({ field }) => (
															<FormItem>
																<FormLabel>Date Opened</FormLabel>
																<FormControl>
																	<Input placeholder="Date Opened" {...field} type="date" />
																</FormControl>
																<FormDescription></FormDescription>
																<FormMessage />
															</FormItem>
														)
													}
												/>
											</div>
											<div className="flex flex-row gap-2 justify-center items-center mt-3">
												<Button type="submit">Add Loan</Button>
												{/*<Button type="button" onClick={() => form.reset()}>Reset</Button>*/}
											</div>
										</form>
									</Form>
								</CardContent>
							</Card>
						</CardDescription>
					</CardHeader>
					<CardContent>
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
