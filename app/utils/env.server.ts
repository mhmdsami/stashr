import { object, parse, string } from "valibot";

const EnvSchema = object({
  SESSION_SECRET: string("SESSION_SECRET is missing in .env"),
  DATABASE_URL: string("DATABASE_URL is missing in .env"),
});

export const { SESSION_SECRET, DATABASE_URL } = parse(EnvSchema, process.env);
