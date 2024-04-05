import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import { ArrowRight } from 'lucide-react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Image from 'next/image'
// import UserAccountNav from './UserAccountNav'
import MobileNav from './MobileNav'
import { UserButton, auth } from '@clerk/nextjs'

const Navbar = () => {
  const { userId: user } = auth();

  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-transparent backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link
            href='/'
            className='flex z-40 font-semibold space-x-1 items-center'>
            <Image
              src={"/logo.png"}
              alt='logo'
              width={40}
              height={40}
              className='mix-blend-color-burn'
            />
            <div>
              <span>un</span>
              <span className='font-bold text-primary'>Cover.</span>
            </div>
          </Link>

          <MobileNav userId={user} />

          <div className='hidden items-center space-x-4 sm:flex'>
            <Link
              href='/pricing'
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}>
              Pricing
            </Link>
            {!user ? (
              <>
                <Link
                  href={"/sign-in"}
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm"
                  })}
                >
                  Sign in
                </Link>
                <Link
                  href={"/sign-up"}
                  className={buttonVariants({
                    size: "sm"
                  })}
                >
                  Get started{' '}
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/dashboard'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Dashboard
                </Link>

                <UserButton afterSignOutUrl='/' />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar