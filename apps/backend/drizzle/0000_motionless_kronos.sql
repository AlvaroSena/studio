CREATE TYPE "public"."class_status" AS ENUM('SCHEDULED', 'DONE', 'CANCELED');--> statement-breakpoint
CREATE TYPE "public"."class_type" AS ENUM('NORMAL', 'REPLACEMENT', 'EXPERIMENTAL');--> statement-breakpoint
CREATE TYPE "public"."collaborator_role" AS ENUM('admin', 'recepcionist', 'instructor');--> statement-breakpoint
CREATE TABLE "classes" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"studio_id" varchar(255) NOT NULL,
	"instructor_id" varchar(255) NOT NULL,
	"student_id" varchar(255) NOT NULL,
	"date" timestamp,
	"status" "class_status" NOT NULL,
	"type" "class_type" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
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
--> statement-breakpoint
CREATE TABLE "students" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"avatar_url" text,
	"birth_date" date NOT NULL,
	"cpf" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"profession" text NOT NULL,
	"registered_by" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "students_cpf_unique" UNIQUE("cpf"),
	CONSTRAINT "students_email_unique" UNIQUE("email"),
	CONSTRAINT "students_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
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
