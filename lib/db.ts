import "@/lib/loadEnv";

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '@/lib/schema'

const connectionString = process.env.DATABASE_URL!

const client = postgres(connectionString, {
    ssl: { rejectUnauthorized: false },
    prepare: false
});

export const db = drizzle(client, { schema, logger: true });
