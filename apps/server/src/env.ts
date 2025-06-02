import { z } from "zod";

const envSchema = z.object({
	CORS_ORIGIN: z.string().url(),
	BETTER_AUTH_SECRET: z.string(),
	BETTER_AUTH_URL: z.string().url(),
	DATABASE_URL: z.string().url(),
	DATABASE_AUTH_TOKEN: z.string(),

	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
