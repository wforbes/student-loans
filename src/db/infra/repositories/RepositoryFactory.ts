import { UserRepository } from "@/db/infra/repositories/UserRepository";
import { ServicerRepository } from "@/db/infra/repositories/ServicerRepository";
import { LoanRepository } from "./LoanRepository";

export class RepositoryFactory {
	private static userRepository: UserRepository | null = null;
	private static servicerRepository: ServicerRepository | null = null;
	private static loanRepository: LoanRepository | null = null;
	
	static getUserRepository() {
		if (!this.userRepository) {
			this.userRepository = new UserRepository();
		}
		return this.userRepository;
	}

	static getServicerRepository() {
		if (!this.servicerRepository) {
			this.servicerRepository = new ServicerRepository();
		}
		return this.servicerRepository;
	}

	static getLoanRepository() {
		if (!this.loanRepository) {
			this.loanRepository = new LoanRepository();
		}
		return this.loanRepository;
	}
}