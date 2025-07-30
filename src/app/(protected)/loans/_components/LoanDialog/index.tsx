"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react"
import { ArrowLeftIcon } from "lucide-react";
import { LoanWithServicer } from "@/db/infra/types/Loan";
import AddLoanForm from "./AddLoanForm";
import EditLoanForm from "./EditLoanForm";

interface LoanDialogProps {
	editLoan: LoanWithServicer | null;
	open: boolean;
	setOpen: (open: boolean) => void;
}

export default function LoanDialog({ editLoan, open, setOpen }: LoanDialogProps) {
	const [servicerFormOpen, setServicerFormOpen] = useState(false);

	const doneAdding = () => {
		setOpen(false);
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
							servicerFormOpen ? (
								<div className="flex flex-row gap-2 justify-start items-center">
									<Button type="button" size="icon" variant="ghost" onClick={() => {
										setServicerFormOpen(false);
									}}>
										<ArrowLeftIcon />
									</Button>
									Add Servicer
								</div>
							):(
								editLoan ? (
									"Edit Loan"
								) : (
									"Add Loan"
								)
							)
						}
					</DialogTitle>
					<DialogDescription className="sr-only">
						{
							servicerFormOpen ? (
								"Add Servicer"
							) : (
								editLoan ? "Edit Loan" : "Add Loan"
							)
						}
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-2">
					{
						editLoan ? (
							<EditLoanForm
								done={doneAdding}
								editLoan={editLoan}
								servicerFormOpen={servicerFormOpen}
								setServicerFormOpen={setServicerFormOpen}	
							/>
						) : (
							<AddLoanForm
								done={doneAdding}
								servicerFormOpen={servicerFormOpen}
								setServicerFormOpen={setServicerFormOpen}	
							/>
						)
					}
				</div>
			</DialogContent>
		</Dialog>
	);
}