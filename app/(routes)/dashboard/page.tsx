import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ExternalLinkIcon, Inbox, Plus, Trash2 } from 'lucide-react';
import { fetchAllCoverLetters } from '@/lib/actions';
import { auth } from '@clerk/nextjs';
import DeleteCoverLetterButton from './components/DeleteCoverLetterButton';

export const revalidate = 0

const DashboardPage = async () => {
    const { userId } = auth()
    const [coverLetters, err] = await fetchAllCoverLetters(userId)

    return (
        <MaxWidthWrapper className='mt-12 sm:mt-16 space-y-5'>
            <div className='flex items-center justify-center sm:space-x-4 sm:space-y-0 space-y-3 flex-col sm:flex-row'>
                <Link
                    href={'/dashboard/resume'}
                    className={cn(buttonVariants({
                        variant: 'outline',
                        size: 'sm'
                    }), 'hidden sm:flex')}
                >
                    View Resumes
                </Link>

                <Link
                    href={'/dashboard/new'}
                    className={cn(buttonVariants({
                        variant: 'default',
                        size: 'sm'
                    }))}
                >
                    <Plus className='w-6 h-6 mr-2' />
                    New cover letter
                </Link>
            </div>

            {coverLetters && coverLetters.length > 0 ? <ul className='mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3'>
                {coverLetters
                    .map((coverletter, index) => (
                        <li
                            key={coverletter.coverLetterId}
                            className='col-span-1 divide-y space-y-4 divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg'>
                            <div
                                className='flex flex-col gap-2'>
                                <div className='pt-6 px-6 flex flex-col w-full space-y-2 items-start'>
                                    <div className='flex-1 truncate'>
                                        <div className='flex items-center space-x-3'>
                                            <h3 className='truncate text-lg font-medium text-zinc-900'>
                                                {coverletter.jobDescription.substring(0, 30) + '...'}
                                            </h3>
                                        </div>
                                    </div>
                                    <p className='text-start text-gray-600'>Cover letter #{index + 1}</p>
                                </div>
                            </div>

                            <div className='flex justify-end items-center p-2 gap-4'>
                                <DeleteCoverLetterButton coverletterId={coverletter.coverLetterId} />
                                <Link href={`/dashboard/${coverletter.coverLetterId}`}>
                                    <Button
                                        size='icon'
                                        variant='outline'
                                    >
                                        <ExternalLinkIcon />
                                    </Button>
                                </Link>
                            </div>
                        </li>
                    ))}
            </ul> : (
                <>
                    <br />
                    <div className='mt-16 sm:mt-32 flex flex-col items-center gap-2'>
                        <Inbox className='h-8 w-8 text-zinc-800' />
                        <h3 className='font-semibold text-xl'>
                            Pretty empty around here
                        </h3>
                        <p>Let&apos;s start.</p>
                    </div>
                </>
            )}


        </MaxWidthWrapper>
    )
}

export default DashboardPage