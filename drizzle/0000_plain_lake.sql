CREATE TABLE IF NOT EXISTS "resumeDetails" (
	"id" text NOT NULL,
	"userId" text NOT NULL,
	"fileName" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
