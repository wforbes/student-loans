import { IServicerRepository } from "@/db/infra/interfaces/IServicerRepository";
import { BaseRepository } from "@/db/infra/repositories/BaseRepository";
import { DrizzleDB } from "@/db/infra/providers/ClientProvider";
import { ClientProvider } from "@/db/infra/providers/ClientProvider";
import { sql, count, eq, and, or } from "drizzle-orm";
import { servicers as servicersTable } from "@/db/drizzle/schema";
import { InsertServicer, SelectServicer } from "../types/Servicer";

export class ServicerRepository extends BaseRepository<DrizzleDB> implements IServicerRepository {
	constructor() {
		super(new ClientProvider());
	}

	async getByUserId(userId: string): Promise<SelectServicer[]> {
		try {
			const result = await this.client.select()
				.from(servicersTable)
				.where(eq(servicersTable.userId, userId));
			return result as SelectServicer[];
		} catch (error) {
			this.handleError(error);
		}
	}

	async insert(servicer: InsertServicer): Promise<InsertServicer> {
		try {
			const result = await this.client.insert(servicersTable).values(servicer).returning();
			return result[0] as SelectServicer;
		} catch (error) {
			this.handleError(error);
		}
	}
}