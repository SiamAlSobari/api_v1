ALTER TABLE `users` ADD `role` varchar(255) DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE `profiles` DROP COLUMN `role`;