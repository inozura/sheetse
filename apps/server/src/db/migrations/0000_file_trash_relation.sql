PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_file` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`key` text NOT NULL,
	`type` text NOT NULL,
	`size` integer NOT NULL,
	`storage_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`storage_id`) REFERENCES `storage`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_file`("id", "name", "url", "key", "type", "size", "storage_id", "created_at", "updated_at") SELECT "id", "name", "url", "key", "type", "size", "storage_id", "created_at", "updated_at" FROM `file`;--> statement-breakpoint
DROP TABLE `file`;--> statement-breakpoint
ALTER TABLE `__new_file` RENAME TO `file`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `file_storage_id_unique` ON `file` (`storage_id`);--> statement-breakpoint
CREATE TABLE `__new_trash` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`key` text NOT NULL,
	`type` text NOT NULL,
	`size` integer NOT NULL,
	`storage_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`storage_id`) REFERENCES `storage`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_trash`("id", "name", "url", "key", "type", "size", "storage_id", "created_at", "updated_at") SELECT "id", "name", "url", "key", "type", "size", "storage_id", "created_at", "updated_at" FROM `trash`;--> statement-breakpoint
DROP TABLE `trash`;--> statement-breakpoint
ALTER TABLE `__new_trash` RENAME TO `trash`;--> statement-breakpoint
CREATE UNIQUE INDEX `trash_storage_id_unique` ON `trash` (`storage_id`);--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer NOT NULL,
	`username` text,
	`display_username` text,
	`image_id` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`image_id`) REFERENCES `storage`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "name", "email", "email_verified", "username", "display_username", "image_id", "created_at", "updated_at") SELECT "id", "name", "email", "email_verified", "username", "display_username", "image_id", "created_at", "updated_at" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_image_id_unique` ON `user` (`image_id`);