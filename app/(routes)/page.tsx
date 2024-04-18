import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { ArrowRight, ListStartIcon, UploadIcon, InboxIcon } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className='mb-12 mt-16 sm:mt-32 flex flex-col items-center justify-center text-center z-40'>
        <div className='relative'>
          <div className='mx-auto mb-4 relative flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50'>
            <p className='text-sm font-semibold text-gray-700'>
              Introducing unCover
            </p>
          </div>
          <div className='absolute -z-40 -top-10 left-[50%] -translate-x-1/2'>
            <Image
                src={"/robot.png"}
                alt='robot'
                width={80}
                height={80}
                className='mix-blend-color-burn'
              />
          </div>
        </div>
        <h1 className='max-w-4xl text-5xl sm:leading-normal leading-[50px] font-bold md:text-6xl lg:text-7xl'>
          Write AI generated{' '} <br />
          <span className='text-primary'>Cover letter</span>{' '}
          in seconds.
        </h1>
        <p className='mt-5 max-w-prose text-zinc-700 sm:text-lg'>
          Uncover Your Dream Job with Ease and Streamline Your Job Application Process:
           Let AI Craft Your Perfect 
          Cover Letter in Seconds!
        </p>

        <Link
          className={buttonVariants({
            size: 'lg',
            className: 'mt-5',
          })}
          href='/dashboard'
         >
          Get started{' '}
          <ArrowRight className='ml-2 h-5 w-5' />
        </Link>
      </MaxWidthWrapper>

      {/* value proposition section */}
      <div>
        <div className='relative isolate'>
          <div>
            <div className='mx-auto max-w-6xl px-6 lg:px-8'>
              <div className='mt-16 flow-root sm:mt-24'>
                <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                  <Image
                    src='/view-1.png'
                    alt='product preview'
                    width={1364}
                    height={866}
                    quality={100}
                    className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className='mx-auto mb-32 mt-32 max-w-5xl sm:mt-56'>
        <div className='mb-12 px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='mt-2 font-bold text-4xl text-gray-900 sm:text-5xl'>
              Start Personalizing Cover Letters with unCover!
            </h2>
            <p className='mt-4 text-lg text-gray-600'>
              Creating cover letter has never been
              easier than with unCover.
            </p>
          </div>
        </div>

        {/* steps */}
        <ol className='my-8 mx-4 sm:mx-0 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0'>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-primary flex items-center'>
                Step 1
                <ListStartIcon className='inline-block ml-2 w-4 h-4' />
              </span>
              <span className='text-xl font-semibold'>
                Sign up for an account
              </span>
              <span className='mt-2 text-zinc-700'>
                Either starting out with a free plan or
                choose our{' '}
                <Link
                  href='/pricing'
                  className='text-primary underline underline-offset-2'>
                  pro plan
                </Link>
                .
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-primary flex items-center'>
                Step 2
                <UploadIcon className='inline-block ml-2 w-4 h-4' />
              </span>
              <span className='text-xl font-semibold'>
                Upload your resume
              </span>
              <span className='mt-2 text-zinc-700'>
                We&apos;ll process your file and make it
                ready for you to chat with.
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-primary flex items-center'>
                Step 3
                <InboxIcon className='inline-block ml-2 w-4 h-4' />
              </span>
              <span className='text-xl font-semibold'>
                Start creating cover letter
              </span>
              <span className='mt-2 text-zinc-700'>
                It&apos;s that simple. Try out unCover today -
                it really takes less than a minute.
              </span>
            </div>
          </li>
        </ol>

        <div className='flex flex-col sm:flex-row w-full'>
          <div className='mx-auto max-w-6xl px-6 lg:px-8'>
            <div className='mt-16 flow-root sm:mt-24'>
              <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                <Image
                  src='/view-2.png'
                  alt='uploading preview'
                  width={1419}
                  height={732}
                  quality={100}
                  className='rounded-md w-full h-full bg-white p-2 shadow-2xl ring-1 ring-gray-900/10'
                />
              </div>
            </div>
          </div>
          <div className='mx-auto max-w-6xl px-6 lg:px-8'>
            <div className='mt-16 flow-root sm:mt-24'>
              <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                <Image
                  src='/view-3.png'
                  alt='uploading preview'
                  width={1419}
                  height={732}
                  quality={100}
                  className='rounded-md w-full h-full bg-white p-2 shadow-2xl ring-1 ring-gray-900/10'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}