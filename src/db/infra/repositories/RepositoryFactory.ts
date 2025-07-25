import { UserRepository } from "@/db/infra/repositories/UserRepository";

export class RepositoryFactory {
	private static userRepository: UserRepository | null = null;

	static getUserRepository() {
		if (!this.userRepository) {
			this.userRepository = new UserRepository();
		}
		return this.userRepository;
	}
}