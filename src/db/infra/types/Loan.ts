import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import {
	loans as loansTable,
} from '@/db/drizzle/schema';

export const SelectLoanSchema = createSelectSchema(loansTable);
export type SelectLoan = z.infer<typeof SelectLoanSchema>;
export const InsertLoanSchema = createInsertSchema(loansTable)
	.omit({
		id: true
	});
export type InsertLoan = z.infer<typeof InsertLoanSchema>;

export type NewLoan = {
	servicerId: string;
	nickname: string;
	principle: number;
	interestRate: number;
	dateOpened: string;
}