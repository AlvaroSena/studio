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
	CONSTRAINT "students_email_unique" UNIQUE("email"),
	CONSTRAINT "students_phone_unique" UNIQUE("phone")
);
