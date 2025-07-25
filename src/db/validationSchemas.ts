import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import {
	users as usersTable,
} from '@/db/drizzle/schema';
import { z } from 'zod';

// For Users
export const baseUserDrizzleSchema = createSelectSchema(usersTable);

export const UserSchema = baseUserDrizzleSchema;
export type User = z.infer<typeof UserSchema>;

export const InsertUserSchema = createInsertSchema(usersTable, {
	email: z.string().email({ message: "Invalid email address" }),
	passhash: z.string().min(8, { message: "Password must be at least 8 characters" })
});

export type InsertUserDTO = z.input<typeof InsertUserSchema>;