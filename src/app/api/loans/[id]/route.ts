import { getCurrentUser } from "@/app/_actions/user";
import { NextRequest, NextResponse } from "next/server";
import { RepositoryFactory } from "@/db/infra/repositories/RepositoryFactory";
import { InsertLoan, SelectLoanSchema } from "@/db/infra/types/Loan";

export async function DELETE(request: NextRequest) {
	const user = await getCurrentUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	const loanId = request.nextUrl.pathname.split("/").pop();
	if (!loanId) {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
	const loan = await RepositoryFactory.getLoanRepository().getById(loanId);
	if (!loan) {
		return NextResponse.json({ error: "Loan not found" }, { status: 404 });
	}
	if (loan.userId !== user.id) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	const deletedLoan = await RepositoryFactory.getLoanRepository().deleteById(loanId);
	console.log("deletedLoan", deletedLoan);
	if (!deletedLoan) {
		return NextResponse.json({ error: "Failed to delete loan" }, { status: 500 });
	}
	return NextResponse.json(deletedLoan);
}