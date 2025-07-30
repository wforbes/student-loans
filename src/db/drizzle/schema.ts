import { pgTable, unique, uuid, varchar, timestamp, foreignKey, integer, doublePrecision, date, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: uuid().primaryKey().notNull(),
	username: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	passhash: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("users_username_key").on(table.username),
	unique("users_email_key").on(table.email),
]);

export const servicers = pgTable("servicers", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id"),
	name: varchar({ length: 63 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "servicers_user_id_fkey"
		}).onDelete("cascade"),
]);

export const loans = pgTable("loans", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id"),
	servicerId: uuid("servicer_id"),
	nickname: varchar({ length: 63 }).notNull(),
	principle: integer().notNull(),
	interestRate: doublePrecision("interest_rate").notNull(),
	dateOpened: date("date_opened"),
	active: boolean().default(true),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "loans_user_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.servicerId],
			foreignColumns: [servicers.id],
			name: "loans_servicer_id_fkey"
		}).onDelete("cascade"),
]);
