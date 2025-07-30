import { getCurrentUser } from "@/app/_actions/user";
import { NextRequest, NextResponse } from "next/server";
import { RepositoryFactory } from "@/db/infra/repositories/RepositoryFactory";
import { InsertLoan, SelectLoanSchema } from "@/db/infra/types/Loan";

export async function GET(request: NextRequest) {
	const user = await getCurrentUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	const loans = await RepositoryFactory.getLoanRepository().getByUserId(user.id);
	const servicers = await RepositoryFactory.getServicerRepository().getByUserId(user.id);
	const loansWithServicer = loans.map((loan) => {
		const servicer = servicers.find((s) => s.id === loan.servicerId);
		return { ...loan, servicerName: servicer?.name };
	});
	
	return NextResponse.json(loansWithServicer);
}

export async function PUT(request: NextRequest) {
	const user = await getCurrentUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await request.json();
	
	const { nickname, servicerId, principle, interestRate, dateOpened } = body;
	if (!nickname || !servicerId || !principle || !interestRate) {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}

	let _dateOpened: string | null = dateOpened;
	if (!_dateOpened || _dateOpened === "") {
		_dateOpened = null;
	}

	if (body.id) {
		const loan = await RepositoryFactory.getLoanRepository().getById(body.id);
		if (!loan) {
			return NextResponse.json({ error: "Loan not found" }, { status: 404 });
		}
		const result = await RepositoryFactory.getLoanRepository().update({
			id: body.id,
			userId: user.id,
			servicerId,
			nickname,
			principle,
			interestRate,
			dateOpened: _dateOpened || null,
			active: true
		});
		if (!result || !SelectLoanSchema.safeParse(result).success) {
			return NextResponse.json({ error: "Failed to update loan" }, { status: 500 });
		}
		return NextResponse.json(result);
	}
	
	const loan: InsertLoan = { userId: user.id, servicerId, nickname, principle, interestRate, dateOpened: _dateOpened };
	const result = await RepositoryFactory.getLoanRepository().insert(loan);
	if (!result || !SelectLoanSchema.safeParse(result).success) {
		return NextResponse.json({ error: "Failed to add loan" }, { status: 500 });
	}
	
	return NextResponse.json(result);
}



