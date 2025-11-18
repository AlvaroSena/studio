CREATE TYPE "public"."payment_method" AS ENUM('PIX', 'CASH', 'CREDIT_CARD', 'DEBIT_CARD');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('PENDING', 'PAID', 'OVERDUE', 'CANCELED');--> statement-breakpoint
CREATE TYPE "public"."plan_period" AS ENUM('MONTHLY', 'QUARTERLY', 'SEMIANNUAL', 'ANNUAL');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('PENDING', 'ACTIVE', 'SUSPENDED', 'CANCELED');--> statement-breakpoint
CREATE TABLE "plans" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"period" "plan_period" NOT NULL,
	"frequency" text NOT NULL,
	"monthly_price_in_cents" integer NOT NULL,
	"total_price_in_cents" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"plan_id" varchar(255) NOT NULL,
	"student_id" varchar(255) NOT NULL,
	"status" "subscription_status" DEFAULT 'PENDING' NOT NULL,
	"start_date" timestamp DEFAULT now(),
	"end_date" timestamp NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "subscriptions_payments" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"subscription_id" varchar(255) NOT NULL,
	"amount_in_cents" integer NOT NULL,
	"due_date" timestamp NOT NULL,
	"paid_at" timestamp,
	"status" "payment_status" DEFAULT 'PENDING' NOT NULL,
	"payment_method" "payment_method" NOT NULL
);
