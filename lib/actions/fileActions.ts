"use server"

import { and, eq } from "drizzle-orm";
import { db } from "../db"
import { resumeDetail } from "../schema"

export const storeResumeDetails = async (userId: string | null, resumeId: string, fileName: string) => {
    if(!userId || !resumeId || !fileName) {
        return [null, new Error("Invalid data")] as const
    }

    const url = process.env.SUPABASE_BUCKET_BASEURL! + userId + "/" + fileName

    try {
        const res = await db.insert(resumeDetail).values({
            resumeId,
            userId,
            fileName,
            url
        }).returning({
            resumeId: resumeDetail.resumeId
        });

        return [res[0], null] as const
    } catch (error) {
        return [null, error as Error] as const
    }
}

export const getResumeDetailsById = async (userId: string | null, resumeId: string) => {
    if(!userId || !resumeId) {
        return [null, new Error("Invalid data")] as const
    }

    try {
        const res = await db.select().from(resumeDetail).where(and(
            eq(resumeDetail.userId, userId),
            eq(resumeDetail.resumeId, resumeId)
        ))

        return [res[0], null] as const
    } catch (error) {
        return [null, error as Error] as const
    }
}

export const getAllResumes = async (userId: string | null) => {
    if(!userId) {
        return [null, new Error("Invalid data")] as const
    }

    try {
        const res = await db.select().from(resumeDetail).where(eq(resumeDetail.userId, userId))

        return [res, null] as const
    } catch (error) {
        return [null, error as Error] as const
    }
}