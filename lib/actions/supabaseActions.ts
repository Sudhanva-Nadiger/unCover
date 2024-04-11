import { supabase } from "@/lib/supabse"
import { BUCKET_NAME } from "../constants";

export const uploadResume = async (userId: string | null, file: File) => {

    if(!userId) {
        return [null, new Error("User not found")] as const
    }
    
    try {
        const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(`${userId}/${file.name}`, file)

        return [data as unknown as { id: string }, error] as const
    } catch (error) {
        return [null, error] as const
    }
}