import "@/lib/loadEnv";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
