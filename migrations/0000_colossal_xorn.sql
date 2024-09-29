CREATE TABLE `movies` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`release_year` integer,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
