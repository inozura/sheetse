import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";
import { file } from "./file";
import { trash } from "./trash";

export const storage = sqliteTable("storage", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => uuidv4()),
	name: text("name").notNull(),
	url: text("url").notNull(),
	key: text("key").notNull(),
	type: text("type").notNull(),
	size: integer("size").notNull(),
	createdAt: integer("created_at", { mode: "timestamp" })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const fileRelationship = relations(file, ({ many }) => ({
	file: many(storage),
}));

export const trashRelationship = relations(trash, ({ many }) => ({
	trash: many(storage),
}));
