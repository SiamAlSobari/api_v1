CREATE TABLE `topics` (
	`id` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `topics_id` PRIMARY KEY(`id`),
	CONSTRAINT `topics_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `topics_posts` (
	`post_id` varchar(255) NOT NULL,
	`topic_id` varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE `profiles` ADD `first_name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `profiles` ADD `last_name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `profiles` ADD `user_name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `topics_posts` ADD CONSTRAINT `topics_posts_post_id_posts_id_fk` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `topics_posts` ADD CONSTRAINT `topics_posts_topic_id_topics_id_fk` FOREIGN KEY (`topic_id`) REFERENCES `topics`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `profiles` DROP COLUMN `name`;