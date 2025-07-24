import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { formatCurrency } from "@/lib/utils";
import { Loan } from "@/components/LoanTable/columns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export type Payment = {
	amount: number,
	loanId: string
}

export const FormSchema = z.object({
	amount: z.string().transform((str) => {
		const num = parseFloat(str.toString());
		if (isNaN(num)) {
			return "";
		}
		// ensure number has 2 decimal places
		return num.toFixed(2);
	}).refine(
		val => parseFloat(val) > 0, { message: 'Money amount must be greater than 0' }
	),
	loanId: z.string().refine(
		val => {
			return val !== "" || val !== undefined || val !== null
		}, { message: 'Please select a loan' }
	)
})

export default function ExtraPaymentDialog({ onSubmit, payments, loans }: { onSubmit: (data: z.infer<typeof FormSchema>) => void, payments: Payment[], loans: Loan[] }) {
	const [open, setOpen] = useState(false)
	
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			amount: "",
			loanId: ""
		}
	})

	const _submit = (data: z.infer<typeof FormSchema>) => {
		onSubmit(data)
		form.reset()
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">Manage Extra Payments</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col max-h-[500px] overflow-y-auto min-h-[500px]">
				<DialogHeader>
					<DialogTitle>Manage Extra Payments</DialogTitle>
				</DialogHeader>
				<Card className="flex flex-col gap-2 p-2">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(_submit)} className="flex flex-row gap-2 justify-between">
							<FormField
								control={form.control}
								name="amount"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel className="text-xs text-muted-foreground">Amount</FormLabel>
										<FormControl>	
											<Input placeholder="Add an extra payment amount (like 100.00 or 543)" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="loanId"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel className="text-xs text-muted-foreground">Loan</FormLabel>
										<FormControl>	
											<Select onValueChange={field.onChange} value={field.value}>
												<SelectTrigger>
													<SelectValue placeholder="Select a loan" />
												</SelectTrigger>
												<SelectContent>
													{loans.map((loan) => (
														<SelectItem key={loan.id} value={loan.id}>{loan.id} - {formatCurrency(loan.principle)} - {loan.interestRate}%</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex justify-center items-center mt-6">
								<Button type="submit">Add</Button>
							</div>
						</form>
					</Form>
				</Card>
				<div className="flex flex-col gap-2">
					{payments?.map((payment) => (
						<Card key={+new Date() + Math.random() * 1000000} className="p-2">
							<p>Extra Payment for: {formatCurrency(payment.amount)}</p>
						</Card>
					))}
				</div>
			</DialogContent>
		</Dialog>
	)
}