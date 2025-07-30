import { SelectServicer, InsertServicer } from "@/db/infra/types/Servicer";

export interface IServicerRepository {
	getByUserId(userId: string): Promise<SelectServicer[]>;
	insert(servicer: InsertServicer): Promise<InsertServicer>;
	
}