import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { DATABASE_URL } from "~/utils/env.server";

const queryClient = postgres(DATABASE_URL);
export const db = drizzle(queryClient);
