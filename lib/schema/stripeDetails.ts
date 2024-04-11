import { boolean, pgTable, text } from "drizzle-orm/pg-core";


export const stripeDetails = pgTable('stripeDetails', ({
    userId: text('userId').primaryKey().notNull(),
    isSubscribed: boolean('isSubscribed').notNull().default(false),
}))

export type StripeDetails = typeof stripeDetails.$inferSelect