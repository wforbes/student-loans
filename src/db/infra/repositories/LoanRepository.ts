import { ILoanRepository } from "@/db/infra/interfaces/ILoanRepository";
import { BaseRepository } from "@/db/infra/repositories/BaseRepository";
import { DrizzleDB } from "@/db/infra/providers/ClientProvider";
import { ClientProvider } from "@/db/infra/providers/ClientProvider";
import { sql, count, eq, and, or } from "drizzle-orm";
import { loans as loansTable } from "@/db/drizzle/schema";
import { EditLoan, InsertLoan, SelectLoan } from "../types/Loan";

export class LoanRepository extends BaseRepository<DrizzleDB> implements ILoanRepository {
	constructor() {
		super(new ClientProvider());
	}

	async getById(id: string): Promise<SelectLoan | null> {
		try {
			const result = await this.client.select().from(loansTable).where(eq(loansTable.id, id));
			return result[0] as SelectLoan;
		} catch (error) {
			this.handleError(error);
		}
	}

	async getByUserId(userId: string): Promise<SelectLoan[]> {
		try {
			const result = await this.client.select()
				.from(loansTable)
				.where(eq(loansTable.userId, userId));
			return result as SelectLoan[];
		} catch (error) {
			this.handleError(error);
		}
	}

	async insert(loan: InsertLoan): Promise<InsertLoan> {
		try {
			const result = await this.client
				.insert(loansTable)
				.values(loan)
				.returning();

			return result[0] as SelectLoan;
		} catch (error) {
			this.handleError(error);
		}
	}

	async update(loan: EditLoan): Promise<EditLoan> {
		try {
			const result = await this.client
				.update(loansTable).set(loan)
				.where(eq(loansTable.id, loan.id))
				.returning();

			return result[0] as EditLoan;
		} catch (error) {
			this.handleError(error);
		}
	}
}