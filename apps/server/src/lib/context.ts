import type { Env } from "@/types/env";
import { drizzle } from "drizzle-orm/d1";
import type { Context as HonoContext } from "hono";
import { env } from "hono/adapter";
import { auth } from "./auth";

export type CreateContextOptions = {
	context: HonoContext;
};

export async function createContext({ context }: CreateContextOptions) {
	const ENV = env<{ DB: Env["DB"]; KV: Env["KV"] }>(context);

	const db = drizzle(ENV.DB);

	const session = await auth(ENV).api.getSession({
		headers: context.req.raw.headers,
	});
	return {
		db,
		session,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
