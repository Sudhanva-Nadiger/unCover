
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const resumeDetail = pgTable('resumeDetails', {
    resumeId: text('id').notNull(),
    userId: text('userId').notNull(),
    fileName: text('fileName').notNull(),
    url: text('url').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt')
})

export type ResumeDetail = typeof resumeDetail.$inferSelect