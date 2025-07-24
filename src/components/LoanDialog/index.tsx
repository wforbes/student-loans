import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormItem, FormField, FormLabel, FormMessage } from "../ui/form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"

export const FormSchema = z.object({
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



export default function LoanDialog({ onSubmit }: { onSubmit: (data: z.infer<typeof FormSchema>) => void }) {

	const [open, setOpen] = useState(false)
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			id: "",
			principle: "",
			interestRate: "",
			dateOpened: ""
		}
	})

	const _submit = (data: z.infer<typeof FormSchema>) => {
		onSubmit(data)
		form.reset()
		setOpen(false)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Add Loan</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Loan</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col gap-2">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(_submit)} className="flex flex-col gap-2">
							<FormField
								control={form.control}
								name="id"
								render={
									({ field }) => (
										<FormItem>
											<FormLabel>ID</FormLabel>
											<FormControl>
												<Input placeholder="ID# ( Something unique to remember the loan by )" {...field} />
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
												<Input placeholder="Current Principle ( How much you currently owe )" {...field} />
											</FormControl>
											<FormDescription></FormDescription>
											<FormMessage />
										</FormItem>
									)
								}
							/>
							<FormField
								control={form.control}
								name="interestRate"
								render={
									({ field }) => (
										<FormItem>
											<FormLabel>Interest Rate</FormLabel>
											<FormControl>
												<Input placeholder="Interest Rate ( Percentage like 5.5% )" {...field} />
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
											<FormLabel>Date Opened ( Optional )</FormLabel>
											<FormControl>
												<Input placeholder="Date Opened" {...field} type="date" />
											</FormControl>
											<FormDescription></FormDescription>
											<FormMessage />
										</FormItem>
									)
								}
							/>
							<div className="flex flex-row gap-2 justify-center items-center mt-3">
								<Button type="submit">Add Loan</Button>
								{/*<Button type="button" onClick={() => form.reset()}>Reset</Button>*/}
							</div>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	)
}