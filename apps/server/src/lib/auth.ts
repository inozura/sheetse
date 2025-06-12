import { env as envVar } from "@/env";
import type { Env } from "@/types/env";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema/auth";

export const auth = (env: Env) => {
	const db = drizzle(env.DB);

	return betterAuth({
		database: drizzleAdapter(db, {
			provider: "sqlite",

			schema: schema,
		}),
		trustedOrigins: [envVar.CORS_ORIGIN || ""],
		emailAndPassword: {
			enabled: true,
		},
		plugins: [username()],
		socialProviders: {
			google: {
				prompt: "select_account",
				clientId: envVar.GOOGLE_CLIENT_ID,
				clientSecret: envVar.GOOGLE_CLIENT_SECRET,
			},
		},
	});
};
