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
	
	return NextResponse.json(loans);
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
	
	const loan: InsertLoan = { userId: user.id, servicerId, nickname, principle, interestRate, dateOpened: _dateOpened };
	const result = await RepositoryFactory.getLoanRepository().insert(loan);
	if (!result || !SelectLoanSchema.safeParse(result).success) {
		return NextResponse.json({ error: "Failed to add loan" }, { status: 500 });
	}
	
	return NextResponse.json(result);
}



