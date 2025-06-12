import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";
import { storage } from "./storage";

export const file = sqliteTable("file", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => uuidv4()),
	name: text("name").notNull(),
	url: text("url").notNull(),
	key: text("key").notNull(),
	type: text("type").notNull(),
	size: integer("size").notNull(),

	storageId: text("storage_id")
		.notNull()
		.unique()
		.references(() => storage.id),

	createdAt: integer("created_at", { mode: "timestamp" })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const fileRelationship = relations(file, ({ one }) => ({
	storage: one(storage, {
		fields: [file.storageId],
		references: [storage.id],
	}),
}));
