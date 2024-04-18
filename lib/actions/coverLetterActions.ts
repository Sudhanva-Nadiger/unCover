"use server"

import { unstable_noStore as noStore } from 'next/cache';
import { and, eq } from "drizzle-orm"
import { db } from "../db"
import { coverLetter, type CoverLetter } from "../schema"
import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"


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

export const fetchAllCoverLetters = async (userId: string | null) => {
    noStore()
    if(!userId) {
        return [null, new Error("Invalid user")] as const
    }

    try {
        const res = await db.select().from(coverLetter).where(eq(coverLetter.userId, userId))
        return [res, null] as const
    } catch (error) {
        return [null, error as Error] as const
    }

}

export const deleteCoverLetter = async (id: string) => {
    const { userId } = auth()

    if(!userId || !id) {
        return [null, new Error('Invalid data')] as const
    }

    try {
        await db.delete(coverLetter).where(and(
            eq(coverLetter.userId, userId),
            eq(coverLetter.coverLetterId, id)
        ))
        revalidatePath('/dashboard')
    } catch (error) {
        return [null, error as Error] as const
    }

    return [true, null] as const
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