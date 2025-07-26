import { z } from "zod";

export const users = z.object({
	id: z.string().uuid(),
	username: z.string().min(2).max(50),
	email: z.string().email(),
	passhash: z.string().min(8).max(100),
	image: z.string().url().nullable().optional(),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime()
})

export type User = z.infer<typeof users>

export const UserSafeDTO = users.omit({ passhash: true });
export type UserSafeDTO = z.infer<typeof UserSafeDTO>;
