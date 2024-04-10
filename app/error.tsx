'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowBigDown, ArrowLeftIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Error = () => {
  return (
    <div className='flex w-full h-full items-center justify-center'>
        <div className='w-1/2 h-1/2 border shadow bg-secondary'>
            <div className='flex gap-4'>
                <div className='border ring-1'>
                    <Image 
                        src='/error.svg' 
                        alt='error' 
                        width={50} 
                        height={50} 
                        className='w-full h-full object-contain' 
                    />
                </div>
                <div className='flex flex-col justify-around space-y-2'>
                    <h1 className='text-3xl text-destructive'>Error</h1>
                    <p className='text-lg text-secondary'>An error occurred while processing your request.</p>
                </div>
            </div>

            <Link href={'/'} className={cn(buttonVariants({
                variant: 'outline',
                size: 'lg'
            }))}>
                <ArrowLeftIcon className='w-6 h-6 mr-2' />
                Go to Home
            </Link>
        </div>
    </div>
  )
}

export default Error