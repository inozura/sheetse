import { file } from "../db/schema/file";
import { publicProcedure } from "../lib/orpc";

export const fileRouter = {
	getAll: publicProcedure.handler(async ({ context }) => {
		const { db } = context;
		return await db.select().from(file);
	}),

	// create: publicProcedure
	// 	.input(z.object({ text: z.string().min(1) }))
	// 	.handler(async ({ input }) => {
	// 		const result = await db
	// 			.insert(todo)
	// 			.values({
	// 				text: input.text,
	// 			})
	// 			.returning();
	// 		return result[0];
	// 	}),

	// toggle: publicProcedure
	// 	.input(z.object({ id: z.number(), completed: z.boolean() }))
	// 	.handler(async ({ input }) => {
	// 		await db
	// 			.update(todo)
	// 			.set({ completed: input.completed })
	// 			.where(eq(todo.id, input.id));
	// 		return { success: true };
	// 	}),

	// delete: publicProcedure
	// 	.input(z.object({ id: z.number() }))
	// 	.handler(async ({ input }) => {
	// 		await db.delete(todo).where(eq(todo.id, input.id));
	// 		return { success: true };
	// 	}),
};
