import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import {
	servicers as servicersTable,
} from '@/db/drizzle/schema';

export const SelectServicerSchema = createSelectSchema(servicersTable);
export type SelectServicer = z.infer<typeof SelectServicerSchema>;
export const InsertServicerSchema = createInsertSchema(servicersTable)
	.omit({
		id: true
	});
export type InsertServicer = z.infer<typeof InsertServicerSchema>;

export type NewServicer = {
	name: string;
}
