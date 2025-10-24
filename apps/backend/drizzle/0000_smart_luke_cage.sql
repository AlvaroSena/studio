CREATE TYPE "public"."collaborator_role" AS ENUM('admin', 'recepcionist', 'instructor');--> statement-breakpoint
CREATE TABLE "collaborators" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"photo_url" varchar(255),
	"regional_council" varchar(255) NOT NULL,
	"birth_date" date NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone_number" varchar(255) NOT NULL,
	"hiring_date" date,
	"password_hash" varchar(128) NOT NULL,
	"role" "collaborator_role" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "collaborators_regional_council_unique" UNIQUE("regional_council"),
	CONSTRAINT "collaborators_email_unique" UNIQUE("email"),
	CONSTRAINT "collaborators_phone_number_unique" UNIQUE("phone_number")
);
