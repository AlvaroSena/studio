CREATE TABLE "studio_schedule" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"studio_id" varchar(255) NOT NULL,
	"day_of_week" text NOT NULL,
	"open_time" text NOT NULL,
	"close_time" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "studios" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
