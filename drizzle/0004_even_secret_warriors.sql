ALTER TABLE `profiles` ADD `gender` varchar(20);--> statement-breakpoint
ALTER TABLE `profiles` ADD `avatar_iamge_url` varchar(255) DEFAULT 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg';--> statement-breakpoint
ALTER TABLE `profiles` ADD `cover_image_url` varchar(255);--> statement-breakpoint
ALTER TABLE `profiles` DROP COLUMN `avatar_url`;