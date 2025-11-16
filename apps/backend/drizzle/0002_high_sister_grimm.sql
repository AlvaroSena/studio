CREATE TABLE "enrollments" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"class_id" varchar(255) NOT NULL,
	"student_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "classes" DROP COLUMN "student_id";