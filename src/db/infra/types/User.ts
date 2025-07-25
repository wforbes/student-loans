import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import {
	users as usersTable,
} from '@/db/drizzle/schema';

export const SelectUserSchema = createSelectSchema(usersTable);
export type SelectUser = z.infer<typeof SelectUserSchema>;

export const InsertUserSchema = createInsertSchema(usersTable)
	.omit({
		id: true,
		created_at: true,
		updated_at: true
	});