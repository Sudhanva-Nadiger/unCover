import { GoogleGenerativeAI } from '@google/generative-ai'

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export const gemini = genAi.getGenerativeModel({ model: 'gemini-pro' })