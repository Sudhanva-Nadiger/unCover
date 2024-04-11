'use server'

import { auth } from "@clerk/nextjs"
import { getAbsoluteURL } from "../utils"
import { PLANS } from '@/lib/config/stripe'
import { db } from '@/lib/db'
import { stripeDetails } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { stripe } from "../stripe"


export async function getUserSubscriptionPlan() {
    const { userId } = auth()
  
    if (!userId) {
      return {
        ...PLANS[0],
        isSubscribed: false,
        stripeSubscriptionId: '',
        stripeCustomerId: '',
      }
    }
  
   
    const [ stripeDetail ] = await db.select().from(stripeDetails).where(eq(stripeDetails.userId, userId))

    if(!stripeDetail) {
        return {
            ...PLANS[0],
            isSubscribed: false,
            stripeSubscriptionId: '',
            stripeCustomerId: '',
        }
    }

    const isSubscribed = stripeDetail.isSubscribed
  
    const plan = isSubscribed
      ? PLANS[1]
      : PLANS[0]
  
    return {
      ...plan,
      stripeSubscriptionId: stripeDetail.stripeSubscriptionId,
      stripeCustomerId: stripeDetail.stripeCustomerId,
      isSubscribed,
    }
  }

export const createStipeCheckoutSession = async () => {
    const { userId, user } = auth()

    console.log("Helllo world");
    

    if(!userId) return [null, new Error("Not authenticated")] as const

    
    if(!userId) {
        return [null, new Error("User not found")]
    }
    
    const billingUrl = getAbsoluteURL("/dashboard/billing")
    const subscriptionPlan = await getUserSubscriptionPlan()

    if(!subscriptionPlan) {
        return [null, new Error("Subscription plan not found")] as const
    }

    if(subscriptionPlan.isSubscribed) {
        return [{
            message: "You are already subscribed to the Pro plan",
        }, null] as const
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${billingUrl}?status=success`,
        cancel_url: `${billingUrl}?status=cancel`,
        line_items: [
            {
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: user?.firstName + " " + user?.lastName + " - Pro Plan",
                    },
                    unit_amount: PLANS[1].price.amount * 100,
                },
                quantity: 1,
            }
        ],
        metadata: {
            userId
        },
    })

    return [{
        url: session.url
    }, null] as const
}