CREATE TABLE IF NOT EXISTS "coverLetter" (
	"coverLetterId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"resumeId" text NOT NULL,
	"jobDescription" text NOT NULL,
	"customPrompt" text,
	"response" text NOT NULL
);
