import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LoanWithServicer } from "@/db/infra/types/Loan";
import { formatCurrency } from "@/lib/utils";
import { useDeleteLoanMutation } from "@/services/loan/mutations";

export default function DeleteLoanDialog(
	{ loanToDelete, open, setOpen }:
	{ loanToDelete: LoanWithServicer | null, open: boolean, setOpen: (open: boolean) => void }
) {
	const { mutateAsync: deleteLoan, isPending } = useDeleteLoanMutation();
	if (!loanToDelete) {
		return null;
	}

	const handleDelete = async () => {
		await deleteLoan(loanToDelete.id);
		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete Loan</DialogTitle>
				</DialogHeader>
				<DialogDescription className="sr-only">
					Delete Loan
				</DialogDescription>
				<div className="text-sm text-center">
					<div className="text-lg font-bold">Are you sure you want to delete this loan?</div>
					<div className="flex flex-row justify-center gap-2 mt-6">
						<ul>
							<li className="flex justify-end">
								<span className="font-bold">Servicer</span>:
							</li>
							<li className="flex justify-end">
								<span className="font-bold">Nickname:</span>
							</li>
							<li className="flex justify-end">
								<span className="font-bold">Principle:</span>
							</li>
							<li className="flex justify-end">
								<span className="font-bold">Interest Rate:</span>
							</li>
							<li className="flex justify-end">
								<span className="font-bold">Date Opened:</span>
							</li>
						</ul>
						<ul>
							<li className="flex justify-start">{loanToDelete.servicerName}</li>
							<li className="flex justify-start">{loanToDelete.nickname}</li>
							<li className="flex justify-start">{formatCurrency(loanToDelete.principle)}</li>
							<li className="flex justify-start">{loanToDelete.interestRate}%</li>
							<li className="flex justify-start">
								{
								loanToDelete.dateOpened && loanToDelete.dateOpened !== ""
								? new Date(loanToDelete.dateOpened).toLocaleDateString()
								: "N/A"
							}</li>
						</ul>
					</div>
					
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
					<Button
						variant="destructive"
						className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed"
						onClick={() => handleDelete()}
						disabled={isPending}
					>
						{isPending ? "Deleting..." : "Delete"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}