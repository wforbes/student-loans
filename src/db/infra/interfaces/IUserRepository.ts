import { User } from "@/db/zodSchemas";

export interface IUserRepository {
	existsByEmail(email: string): Promise<boolean>;
	getById(id: string): Promise<User | null>;
	//getByEmail(email: string): Promise<User | null>;
	//getByEmailForAuth(email: string): Promise<User | null>;
	//getByUserName(userName: string): Promise<User | null>;
	//create(user: Omit<User, 'created_at' | 'updated_at'> & { id?: string }): Promise<{ success: boolean }>;
	//update(user: User): Promise<User>;
	//getAllUsers(): Promise<Omit<User, 'passhash'>[]>;
}