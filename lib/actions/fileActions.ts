"use server"

import { and, count, eq } from "drizzle-orm";
import { db } from "../db"
import { ResumeDetail, resumeDetail } from "../schema"
import { revalidatePath } from "next/cache";
import { supabase } from "../supabse";
import { BUCKET_NAME } from "../constants";

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

        revalidatePath('/dashboard/resume')

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

export const getTotalResumeCount = async (userId: string | null) => {
    if(!userId) {
        return [null, new Error("Invalid data")] as const
    }

    try {
        const res = await db.select({
            count: count()
        }).from(resumeDetail).where(eq(resumeDetail.userId, userId))

        return [res[0].count, null] as const
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

export const deleteResume = async (resume: ResumeDetail) => {
    try {
        const deleteFromDbPromise = db.delete(resumeDetail).where(and(eq(resumeDetail.resumeId, resume.resumeId), eq(resumeDetail.userId, resume.userId))).returning()

        const deleteFromBucketPromise = supabase.storage.from(BUCKET_NAME).remove([`${resume.userId}/${resume.fileName}`])

        const [_, { error }] = await Promise.all([deleteFromDbPromise, deleteFromBucketPromise])

        if(error) {
            throw error
        }

        revalidatePath('/dashboard/resume')

        return [true, null] as const
    } catch (error) {
        return [null, error as Error] as const
    }
}