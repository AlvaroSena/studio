CREATE TYPE "public"."class_color" AS ENUM('sky', 'amber', 'violet', 'rose', 'emerald', 'orange');--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "start_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "classes" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "classes" ADD COLUMN "color" "class_color" NOT NULL;