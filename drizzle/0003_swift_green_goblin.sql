CREATE TABLE IF NOT EXISTS "stripeDetails" (
	"userId" text PRIMARY KEY NOT NULL,
	"isSubscribed" boolean DEFAULT false NOT NULL,
	"stripeCustomerId" text NOT NULL,
	"stripeSubscriptionId" text NOT NULL,
	"stripePriceId" text NOT NULL
);
