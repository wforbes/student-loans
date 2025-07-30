import { InsertServicer, SelectServicerSchema } from "@/db/infra/types/Servicer";
import { getCurrentUser } from "@/app/_actions/user";
import { NextRequest, NextResponse } from "next/server";
import { RepositoryFactory } from "@/db/infra/repositories/RepositoryFactory";

export async function GET(request: NextRequest) {
	const user = await getCurrentUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	const servicers = await RepositoryFactory.getServicerRepository().getByUserId(user.id);
	return NextResponse.json(servicers);
}

export async function PUT(request: NextRequest) {
	const user = await getCurrentUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	const body = await request.json();
	const { name } = body;
	const servicer: InsertServicer = {
		userId: user.id,
		name
	}
	console.log(`PUT request: ${JSON.stringify(servicer)}`);
	const result = await RepositoryFactory.getServicerRepository().insert(servicer);
	if (!result || !SelectServicerSchema.safeParse(result).success) {
		return NextResponse.json({ error: "Failed to add servicer" }, { status: 500 });
	}
	return NextResponse.json(result);
}



