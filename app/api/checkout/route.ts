import { getUserSubscriptionPlan } from "@/lib/actions/stripeActions";
import { PLANS } from "@/lib/config/stripe";
import { stripe } from "@/lib/stripe";
import { getAbsoluteURL } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET() {

    const { userId, user } = auth()

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 400})
    }

    const billingUrl = getAbsoluteURL("/dashboard/billing")
    const subscriptionPlan = await getUserSubscriptionPlan()

    if (subscriptionPlan.isSubscribed) {
       return NextResponse.json({
        message: "Alredy subscribed"
       })
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
            userId: userId
        },
    })

    return NextResponse.json({
        url: session.url
    })

}