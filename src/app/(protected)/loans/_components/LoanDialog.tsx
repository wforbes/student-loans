"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormItem, FormField, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query";
import { useAddLoanMutation } from "@/services/loan/mutations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useServicersQuery } from "@/services/servicer/queries";
import { SelectServicer } from "@/db/infra/types/Servicer";
import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import AddServicerForm from "./AddServicerForm";

export const FormSchema = z.object({
	nickname: z.string().min(1, {
		message: "Nickname must be at least 2 characters.",
	}),
	servicerId: z.string().min(1, {
		message: "Servicer ID must be at least 2 characters.",
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
			return ""; // Important: Return something to satisfy the return type of transform
		}
		// return format YYYY-MM-DD
		return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
	})
})

export default function LoanDialog() {
	const [open, setOpen] = useState(false)
	const { mutate: addLoan, isPending } = useAddLoanMutation();

	const [showAddServicerForm, setShowAddServicerForm] = useState(false);

	const { data: servicerData } = useServicersQuery();
	const servicers = servicerData as SelectServicer[] | [];

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			servicerId: "",
			nickname: "",
			principle: "",
			interestRate: "",
			dateOpened: ""
		}
	})

	const _submit = (data: z.infer<typeof FormSchema>) => {
		console.log(`LoanDialog _submit: ${JSON.stringify(data)}`)
		addLoan({
			servicerId: data.servicerId,
			nickname: data.nickname,
			principle: parseFloat(data.principle),
			interestRate: parseFloat(data.interestRate),
			dateOpened: data.dateOpened
		})
		form.reset()
		setOpen(false)
	}

	const showServicerForm = () => {
		setShowAddServicerForm(true);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Add Loan</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{
							showAddServicerForm ? (
								<div className="flex flex-row gap-2 justify-start items-center">
									<Button type="button" size="icon" variant="ghost" onClick={() => {
										setShowAddServicerForm(false);
									}}>
										<ArrowLeftIcon />
									</Button>
									Add Servicer
								</div>
							):(
								"Add Loan"
							)
						}
					</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col gap-2">
					{
						showAddServicerForm ? (
							<AddServicerForm done={() => {
								setShowAddServicerForm(false);
							}} />
						) : (

							<Form {...form}>
								<form onSubmit={form.handleSubmit(_submit)} className="flex flex-col gap-2">
									<FormField
										control={form.control}
										name="servicerId"
										render={
											({ field }) => (
												<div className="flex flex-row items-center gap-2">
													<FormItem className="w-full">
														<FormLabel>ID</FormLabel>
														<FormControl className="w-full">
															<Select
																onValueChange={field.onChange}
																disabled={isPending || !servicers || !Array.isArray(servicers) || servicers.length === 0}
																value={field.value}
															>
																<SelectTrigger className="w-full">
																	<SelectValue placeholder="Select a servicer" />
																</SelectTrigger>
																<SelectContent>
																	{
																		servicers && Array.isArray(servicers) && servicers.map((servicer: SelectServicer) => (
																			<SelectItem key={servicer.id} value={servicer.id}>{servicer.name}</SelectItem>
																		))
																	}
																</SelectContent>
															</Select>
														</FormControl>
														<FormDescription></FormDescription>
														<FormMessage />
													</FormItem>
													<div className="mt-3">
														<Button type="button" size="icon" onClick={() => {
															showServicerForm();
														}}>
															<PlusIcon />
														</Button>
													</div>
												</div>
											)
										}
									/>
									<FormField
										control={form.control}
										name="nickname"
										render={
											({ field }) => (
												<FormItem>
													<FormLabel>Nickname</FormLabel>
													<FormControl>
														<Input placeholder="Nickname ( Something unique to remember the loan by )" {...field} />
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
									</div>
								</form>
							</Form>

						)
					}
				</div>
			</DialogContent>
		</Dialog>
	);
}