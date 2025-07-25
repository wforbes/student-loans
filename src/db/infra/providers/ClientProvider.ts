import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { IClientProvider } from './IClientProvider';
import * as schema from '@/db/drizzle/schema'; // Import your Drizzle schema objects

// Define a type for the Drizzle database instance with your specific schema
// The `typeof schema` makes it specific to your tables, relations, etc.
export type DrizzleDB = NodePgDatabase<typeof schema>;

export class ClientProvider implements IClientProvider<DrizzleDB> {
    private static dbInstance: DrizzleDB;
    private static pgPool: Pool;

    getClient(): DrizzleDB {
        if (!ClientProvider.pgPool) {
            ClientProvider.pgPool = new Pool({
                connectionString: process.env.DATABASE_URL, // Recommended way
                // Or individual parameters if DATABASE_URL is not set:
                // host: process.env.PGHOST,
                // user: process.env.PGUSER,
                // password: process.env.PGPASSWORD,
                // database: process.env.PGDATABASE,
                // port: parseInt(process.env.PGPORT || "5432", 10),
                // Add other configurations like SSL if needed for production on Coolify
            });
        }
        if (!ClientProvider.dbInstance) {
            // Pass the schema to the drizzle function
            // The schema import path below should point to your Drizzle schema file(s)
            // This might involve importing all schema objects from an index file in src/db/drizzle/ if they are split
            ClientProvider.dbInstance = drizzle(ClientProvider.pgPool, { schema }); // Pass the imported schema directly
        }
        return ClientProvider.dbInstance;
    }
}