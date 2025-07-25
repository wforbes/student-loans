import { IUserRepository } from "@/db/infra/interfaces/IUserRepository";
import { BaseRepository } from "@/db/infra/repositories/BaseRepository";
import { DrizzleDB } from "@/db/infra/providers/ClientProvider";
import { ClientProvider } from "@/db/infra/providers/ClientProvider";
import { sql, count, eq, and } from "drizzle-orm";
import { usersTable } from "@/db/drizzle/schema";
import { User } from "@/db/zodSchemas";
import { verifySession } from "@/app/_lib/session";

export class UserRepository extends BaseRepository<DrizzleDB> implements IUserRepository {
	constructor() {
		super(new ClientProvider());
	}

	async existsByEmail(email: string): Promise<boolean> {
		try {
			const result = await this.client.select({ value: count() })
				.from(usersTable)
				.where(eq(sql`lower(${usersTable.email})`, email.toLowerCase()));
			return result[0]?.value > 0;
		} catch (error) {
			this.handleError(error);
		}
	}

	async getById(id: string): Promise<User | null> {
		try {
			const session = await verifySession();
			if (!session.userId) throw new Error('Unauthorized');
			const response = await this.client.select()
				.from(usersTable)
				.where(
					and(
						eq(usersTable.id, id),
						eq(usersTable.id, session.userId)
					)
				)
				.limit(1);

			if (response.length === 0) return null;
			return response[0] as User;
		} catch (error) {
			this.handleError(error);
		}
	}
}