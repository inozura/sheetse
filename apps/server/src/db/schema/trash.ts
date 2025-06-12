import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";
import { storage } from "./storage";

export const trash = sqliteTable("trash", {
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

export const trashRelationship = relations(trash, ({ one }) => ({
	storage: one(storage, {
		fields: [trash.storageId],
		references: [storage.id],
	}),
}));
