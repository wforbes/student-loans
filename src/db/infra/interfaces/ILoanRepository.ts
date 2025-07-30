import { SelectLoan, InsertLoan, EditLoan } from "@/db/infra/types/Loan";

export interface ILoanRepository {
	getById(id: string): Promise<SelectLoan | null>;
	getByUserId(userId: string): Promise<SelectLoan[]>;
	insert(loan: InsertLoan): Promise<InsertLoan>;
	update(loan: EditLoan): Promise<EditLoan>;
}