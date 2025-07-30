import { Button } from "@/components/ui/button";
import { LoanWithServicer } from "@/db/infra/types/Loan";
import { useState } from "react";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select } from "@/components/ui/select";
import { PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { FormSchema } from "./LoanFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useServicersQuery } from "@/services/servicer/queries";
import { SelectServicer } from "@/db/infra/types/Servicer";
import AddServicerForm from "../AddServicerForm";
import { useEditLoanMutation } from "@/services/loan/mutations";

interface EditLoanFormProps {
	done: () => void;
	editLoan: LoanWithServicer | null;
	servicerFormOpen: boolean;
	setServicerFormOpen: (open: boolean) => void;
}

export default function EditLoanForm({ done, editLoan, servicerFormOpen, setServicerFormOpen }: EditLoanFormProps) {
	const { mutate: editLoanMutation } = useEditLoanMutation();
	const { data: servicerData, isLoading: servicersAreLoading } = useServicersQuery();
	const servicers = servicerData as SelectServicer[] | [];

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			servicerId: editLoan?.servicerId || "",
			nickname: editLoan?.nickname || "",
			principle: editLoan?.principle.toString() || "",
			interestRate: editLoan?.interestRate.toString() || "",
			dateOpened: editLoan?.dateOpened || ""
		}
	})

	const _submit = (data: z.infer<typeof FormSchema>) => {
		console.log(`EditLoanForm _submit: ${JSON.stringify(data)}`)
		editLoanMutation({
			id: editLoan?.id || "",
			userId: editLoan?.userId || "",
			servicerId: data.servicerId,
			nickname: data.nickname,
			principle: parseFloat(data.principle),
			interestRate: parseFloat(data.interestRate),
			dateOpened: data.dateOpened,
			active: true
		})
		done()
	}

	return (
		servicerFormOpen ? (
			<AddServicerForm done={() => {
				setServicerFormOpen(false);
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
											disabled={servicersAreLoading || !servicers || !Array.isArray(servicers) || servicers.length === 0}
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
										setServicerFormOpen(true);
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
					<Button type="submit">Save Changes</Button>
				</div>
			</form>
		</Form>
		)
	)
}