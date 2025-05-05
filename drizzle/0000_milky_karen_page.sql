CREATE TABLE "about" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"bio" text NOT NULL,
	"skills" json NOT NULL,
	"experience" json,
	"hero" json,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"socials" json,
	"address" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"category" varchar(50) NOT NULL,
	"tags" json NOT NULL,
	"thumbnail" json NOT NULL,
	"images" json NOT NULL,
	"client" varchar(255),
	"year" integer,
	"description" text NOT NULL,
	"challenge" text,
	"solution" text,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
