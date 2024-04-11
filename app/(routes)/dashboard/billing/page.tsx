import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
import { getUserSubscriptionPlan } from '@/lib/actions/stripeActions'
import { Check } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    searchParams: {
        status: string
    }
}

const BillingPage = async ({
    searchParams
}: Props) => {

    let content: JSX.Element = <></>

    if (searchParams.status === 'success') {
        content = (
            <div className='w-full h-full flex items-center justify-center gap-4 mt-12'>
                <div className='flex gap-4'>
                    <div className='flex items-center justify-center w-12 h-12 bg-green-100 rounded-full'>
                        <Check className='w-8 h-8 text-green-500' />
                    </div>
                    <div className='flex flex-col items-start justify-around'>
                        <h1 className='text-xl'>Congratulations 🎉!!!</h1>
                        <h1>You just <strong>Subscribed</strong> to our <strong>Pro Plan</strong></h1>
                    </div>
                </div>
            </div>
        )
    }

    if (searchParams.status === 'cancel') {
        content = (
            <div className='w-full h-full flex flex-col mt-12 items-center justify-center gap-4'>
                <h1 className='text-xl text-destructive'>Subscription process failed. </h1>
                <h1>Try again later.</h1>
            </div>
        )
    }

    if (searchParams.status) {
        return (
            <MaxWidthWrapper className='w-full h-full'>
                {content}
            </MaxWidthWrapper>
        )
    }


    const { isSubscribed } = await getUserSubscriptionPlan()


    return (
        <MaxWidthWrapper>
            {isSubscribed ? (
                <div className='w-full h-full items-center justify-center gap-4'>
                    <h1 className='text-3xl font-bold'>Billing</h1>
                    <p>You are <strong>alredy subscribed</strong> to the Pro plan 🎉!!!</p>
                </div>
            ) : (
                <div className='flex flex-col gap-4'>
                    <p className='text-md'>You are not subscribed to any plan</p>
                    <Link className={buttonVariants({
                        variant: 'link'
                    })} href={'/pricing'}>
                        Pricing
                    </Link>
                </div>
            )}
        </MaxWidthWrapper>
    )
}

export default BillingPage