import { pgTable, text, uuid } from "drizzle-orm/pg-core";


export const coverLetter = pgTable('coverLetter', ({
    coverLetterId: uuid('coverLetterId').defaultRandom().primaryKey(),
    userId: text('userId').notNull(),
    resumeId: text('resumeId').notNull(),
    jobDescription: text('jobDescription').notNull(),
    customPrompt: text('customPrompt'),
    response: text('response').notNull()
}))

export type CoverLetter = typeof coverLetter.$inferSelect