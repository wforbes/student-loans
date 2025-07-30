import { SelectLoan, InsertLoan } from "@/db/infra/types/Loan";

export interface ILoanRepository {
	getByUserId(userId: string): Promise<SelectLoan[]>;
	insert(loan: InsertLoan): Promise<InsertLoan>;
	
}