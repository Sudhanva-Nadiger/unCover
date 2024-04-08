'use server'

import { and, eq } from "drizzle-orm"
import { CoverLetter, coverLetter } from "../schema"
import { db } from "../db"


export const fetchCoverLetterById = async (userId: string | null, coverLetterId: string) => {
    if(!userId) {
        return [null, new Error("Invalid user")] as const
    }

    try {
        const res = await db.select().from(coverLetter).where(and(
            eq(coverLetter.userId, userId),
            eq(coverLetter.coverLetterId, coverLetterId)
        ))

        return [res[0], null] as const
    } catch (error) {
        return [null, error as Error] as const
    }
}

export const saveCoverLetterDetails = async (detail: Omit<CoverLetter, "coverLetterId">) => {
    try {
        const res = await db.insert(coverLetter).values(detail).returning({
            coverLetterId: coverLetter.coverLetterId
        })
        return [res[0], null] as const
    } catch (error) {
        return [null, error as Error] as const
    }
}