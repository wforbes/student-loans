import { IClientProvider } from "@/db/infra/providers/IClientProvider";

export abstract class BaseRepository<T> {
    protected client: T;

    constructor(clientProvider: IClientProvider<T>) {
        this.client = clientProvider.getClient();
    }

    protected handleError(error: Error | unknown): never {
        // Common error handling logic
        console.error('Repository Error:', error);
        throw error instanceof Error ? error : new Error(String(error));
    }
} 