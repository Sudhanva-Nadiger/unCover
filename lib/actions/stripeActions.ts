'use server'

import { PLANS } from '@/lib/config/stripe'
import { db } from '@/lib/db'
import { stripeDetails } from '@/lib/schema'
import { auth } from "@clerk/nextjs"
import { eq } from 'drizzle-orm'


export async function getUserSubscriptionPlan() {
    const { userId } = auth()
  
    if (!userId) {
      return {
        ...PLANS[0],
        isSubscribed: false,
      }
    }
  
   
    const [ stripeDetail ] = await db.select().from(stripeDetails).where(eq(stripeDetails.userId, userId))

    if(!stripeDetail) {
        return {
            ...PLANS[0],
            isSubscribed: false,
        }
    }

    const isSubscribed = stripeDetail.isSubscribed
  
    const plan = isSubscribed
      ? PLANS[1]
      : PLANS[0]
  
    return {
      ...plan,
      isSubscribed,
    }
  }