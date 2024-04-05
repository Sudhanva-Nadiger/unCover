'use client'

import { cn } from '@/lib/utils'
import { ArrowRight, X, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const MobileNav = ({ userId }: { userId: string | null }) => {
  const [isOpen, setOpen] = useState<boolean>(false)

  const toggleOpen = () => setOpen((prev) => !prev)

  const isAuthenticated = !!userId;

  const pathname = usePathname()

  useEffect(() => {
    if (isOpen) toggleOpen()
  }, [pathname])

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen()
    }
  }

  return (
    <div className='sm:hidden'>
      {!isOpen ? (
        <Menu
          onClick={toggleOpen}
          className='relative z-50 h-5 w-5 text-zinc-700 cursor-pointer'
        />) : (
        <X
          onClick={toggleOpen}
          className='relative z-50 h-5 w-5 text-zinc-700 cursor-pointer'
        />
      )}

      {isOpen ? (
        <div className='fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full'>
          <ul className='absolute bg-white border-b border-zinc-200 shadow-xl grid w-full gap-3 px-10 pt-20 pb-8'>
            <li>
              <Link
                onClick={() =>
                  closeOnCurrent('/pricing')
                }
                className='flex items-center w-full font-semibold'
                href='/pricing'>
                Pricing
              </Link>
            </li>
            {!isAuthenticated ? (
              <>
                <li>
                  <Link
                    onClick={() =>
                      closeOnCurrent('/sign-up')
                    }
                    className='flex items-center w-full font-semibold text-primary'
                    href='/sign-up'>
                    Get started
                    <ArrowRight className='ml-2 h-5 w-5' />
                  </Link>
                </li>
                <li className='my-3 h-px w-full bg-gray-300' />
                <li>
                  <Link
                    onClick={() =>
                      closeOnCurrent('/sign-in')
                    }
                    className='flex items-center w-full font-semibold'
                    href='/sign-in'>
                    Sign in
                  </Link>
                </li>
                <li className='my-3 h-px w-full bg-gray-300' />
              </>
            ) : (
              <>
                <li>
                  <Link
                    onClick={() =>
                      closeOnCurrent('/dashboard')
                    }
                    className='flex items-center w-full font-semibold'
                    href='/dashboard'>
                    Dashboard
                  </Link>
                </li>
                <li className={cn({
                  'hidden': pathname === '/'
                })}>
                  <Link
                    onClick={() =>
                      closeOnCurrent('/dashboard')
                    }
                    className={cn('flex items-center w-full font-semibold')}
                    href='/dashboard/resume'>
                    See your resumes.
                  </Link>
                </li>
                <li className='my-3 h-px w-full bg-gray-300' />
                <li>
                  <Link
                    className='flex items-center w-full font-semibold'
                    href='/sign-out'>
                    Sign out
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default MobileNav