import { SelectLoan, InsertLoan, EditLoan } from "@/db/infra/types/Loan";

export interface ILoanRepository {
	getById(id: string): Promise<SelectLoan | null>;
	getByUserId(userId: string): Promise<SelectLoan[]>;
	insert(loan: InsertLoan): Promise<InsertLoan>;
	update(loan: EditLoan): Promise<EditLoan>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	deleteById(id: string): Promise<any>;
}