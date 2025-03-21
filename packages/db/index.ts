import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./src/schema";

export const createClient = (connectionString: string) => {
  const pool = new Pool({
    connectionString,
  });
  
  return drizzle(pool, { schema });
};

export { schema };
export * from "drizzle-orm";