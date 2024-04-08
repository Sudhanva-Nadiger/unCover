import { openai } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const { userId } = auth();

    if(!userId) {
        return new Response('Unauthorised', { status: 401})
    }

    const { url, coverLetterId }  = await req.json() as { url: string, coverLetterId: string }

    if(!url) {
        return new Response('Invalid data, resume url is required', { status: 400})
    }

    if(!coverLetterId) {
        return new Response('Invalid data, cover letter id is required', { status: 400})
    }

    return new Response()

    // call to open ai api and stream the response
}