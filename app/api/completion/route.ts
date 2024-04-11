import { db } from "@/lib/db";
import { gemini } from "@/lib/gemini";
import { coverLetter } from "@/lib/schema";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';

type CoverlteterType = { 
    extractedText: string;
    coverLetterId: string;
    jobDescription: string;
    prompt?: string;
}

function generatePrompt({
    jobDescription,
    extractedText,
    prompt
  }: {
    jobDescription: string
    extractedText: string
    prompt?: string
  }) {
      const { user } = auth()
      
      let result = ''
  
      if( !prompt ) {
        prompt = ''
      }
  
      let userName = ''
  
      if(!user?.firstName) {
        userName = '[Your name]'
      } else {
        userName = user.firstName + ' ' + user.lastName
      }
  
      const email = user?.emailAddresses[0].emailAddress || '[Your email]'
     
      prompt += `
          Write a cover letter for given job description and resume details.
          if anywhere you need to use name then use ${userName} and for email use ${email}.
  
          Miscellaneous information: Be resectful, professional and concise. And give answer in English only unless specified.
      `
  
      result += `
          Job Description: ${jobDescription} \n
  
          Resume details: ${extractedText} \n
  
          prompt:${prompt}

          If the prompt is not related to jobs and cover letter or out of context then please ignore the request and send a response of:
          'Please give valid prompt related to cover letter creation.'
      `
  
      return result
}

export async function POST(req: Request) {
    const { userId } = auth();    

    if(!userId) {
        return new Response('Unauthorised', { status: 401})
    }

    const data = await req.json() as CoverlteterType

    if(!data) {
        return new Response('Invalid request', { status: 400})
    }
   
    const prompt = generatePrompt(data)
    const geminiStream = await gemini.generateContentStream(prompt)

    const stream = GoogleGenerativeAIStream(geminiStream, {
      async onCompletion(text) {
          await db.update(coverLetter).set({
              response: text,
              jobDescription: data.jobDescription,
              customPrompt: data.prompt || '',
          }).where(and(
              eq(coverLetter.userId, userId || ''),
              eq(coverLetter.coverLetterId, data.coverLetterId)
          ))
      }
    });
    return new StreamingTextResponse(stream)
}