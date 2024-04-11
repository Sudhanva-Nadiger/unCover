import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PLANS } from '@/lib/config/stripe'
import { cn } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import UpgradeButton from './components/UpgradeButton'

import {
  ArrowRight,
  Check,
  HelpCircle
} from 'lucide-react'
import Link from 'next/link'
import { getUserSubscriptionPlan } from '@/lib/actions/stripeActions'

const Page = async () => {
  const { userId: user } = auth();
  const { isSubscribed } = await getUserSubscriptionPlan()

  const pricingItems = [
    {
      plan: 'Free',
      tagline: 'Ideal for Entry-Level Job Seekers.',
      quota: 1,
      features: [
        {
          text: 'Only three PDF per account',
          footnote: 'Limited to three uploaded resume.',
        },
        {
          text: 'One page per PDF',
          footnote: 'Maximum page limit for each resume.',
        },
        {
          text: 'Max file size: 1 MB',
          footnote: 'The maximum allowed file size for each resume.',
        },
      ],
    },
    {
      plan: 'Pro',
      tagline: 'Tailored Solutions for Seasoned Professionals.',
      quota: 5,
      features: [
        {
          text: 'Unlimited resumes',
          footnote: 'Upload any number of resume.',
        },
        {
          text: 'Four pages per PDF',
          footnote: 'Expanded page limit per resume.',
        },
        {
          text: 'Max file size: 4 MB',
          footnote: 'Increased maximum file size allowance for each resume.',
        },
      ],
    },
  ];
  

  return (
    <>
      <MaxWidthWrapper className='mb-8 mt-24 text-center max-w-5xl'>
        <div className='mx-auto mb-10 sm:max-w-lg'>
          <h1 className='text-6xl font-bold sm:text-7xl'>
            Pricing
          </h1>
          <p className='mt-5 text-gray-600 sm:text-lg'>
            Whether you&apos;re just trying out our service
            or need more, we&apos;ve got you covered. Become a Pro member today and enjoy the srvice.
          </p>
        </div>

        {isSubscribed &&(
          <div className='bg-green-100 border border-green-200 p-5 rounded-lg'>
            <p className='text-green-800'>
              You are currently subscribed to the Pro plan.
            </p>
          </div>
        
        )}

        <div className='pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2'>
          <TooltipProvider>
            {pricingItems.map(
              ({ plan, tagline, features }) => {
                const price =
                  PLANS.find(
                    (p) => p.slug === plan.toLowerCase()
                  )?.price.amount || 0

                return (
                  <div
                    key={plan}
                    className={cn(
                      'relative rounded-2xl bg-white shadow-lg',
                      {
                        'border-2 border-primary shadow-yellow-200':
                          plan === 'Pro',
                        'border border-gray-200':
                          plan !== 'Pro',
                      }
                    )}>
                    {plan === 'Pro' && (
                      <div className='absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-yellow-400 to-amber-300 px-3 py-2 text-sm font-medium text-white'>
                        Upgrade now
                      </div>
                    )}

                    <div className='p-5'>
                      <h3 className='my-3 text-center font-display text-3xl font-bold'>
                        {plan}
                      </h3>
                      <p className='text-gray-500'>
                        {tagline}
                      </p>
                      <p className='my-5 font-display text-6xl font-semibold'>
                        ${price}
                      </p>
                    </div>

                    <ul className='my-10 space-y-5 px-8'>
                      {features.map(
                        ({ text, footnote }) => (
                          <li
                            key={text}
                            className='flex space-x-5'>
                            <div className='flex-shrink-0'>
                              {
                                <Check className='h-6 w-6 text-yellow-500' />
                              }
                            </div>
                            {footnote ? (
                              <div className='flex items-center space-x-1'>
                                <p
                                  className={'text-gray-600'}>
                                  {text}
                                </p>
                                <Tooltip
                                  delayDuration={300}>
                                  <TooltipTrigger className='cursor-default ml-1.5'>
                                    <HelpCircle className='h-4 w-4 text-zinc-500' />
                                  </TooltipTrigger>
                                  <TooltipContent className='w-80 p-2'>
                                    {footnote}
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            ) : (
                              <p
                                className={'text-gray-600'}>
                                {text}
                              </p>
                            )}
                          </li>
                        )
                      )}
                    </ul>
                    <div className='border-t border-gray-200' />
                    <div className='p-5'>
                      {plan === 'Free' ? (
                        <Link
                          href={
                            user ? '/dashboard' : '/sign-in'
                          }
                          className={buttonVariants({
                            className: 'w-full',
                            variant: 'secondary',
                          })}>
                          {user ? 'Start using it' : 'Sign up'}
                          <ArrowRight className='h-5 w-5 ml-1.5' />
                        </Link>
                      ) : user ? (
                        <UpgradeButton disabled={isSubscribed} />
                      ) : (
                        <Link
                          href='/sign-in'
                          className={buttonVariants({
                            className: 'w-full',
                          })}>
                          {user ? 'Upgrade now' : 'Sign up'}
                          <ArrowRight className='h-5 w-5 ml-1.5' />
                        </Link>
                      )}
                    </div>
                  </div>
                )
              }
            )}
          </TooltipProvider>
        </div>
      </MaxWidthWrapper>
    </>
  )
}

export default Page