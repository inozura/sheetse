import { protectedProcedure, publicProcedure } from "../lib/orpc";
import { fileRouter } from "./file";

export const appRouter = {
	healthCheck: publicProcedure.handler(() => {
		return "OK";
	}),
	privateData: protectedProcedure.handler(({ context }) => {
		return {
			message: "This is private",
			user: context.session?.user,
		};
	}),
	file: fileRouter,
};
export type AppRouter = typeof appRouter;
