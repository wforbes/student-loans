import { relations } from "drizzle-orm/relations";
import { users, servicers, loans } from "./schema";

export const servicersRelations = relations(servicers, ({one, many}) => ({
	user: one(users, {
		fields: [servicers.userId],
		references: [users.id]
	}),
	loans: many(loans),
}));

export const usersRelations = relations(users, ({many}) => ({
	servicers: many(servicers),
	loans: many(loans),
}));

export const loansRelations = relations(loans, ({one}) => ({
	user: one(users, {
		fields: [loans.userId],
		references: [users.id]
	}),
	servicer: one(servicers, {
		fields: [loans.servicerId],
		references: [servicers.id]
	}),
}));