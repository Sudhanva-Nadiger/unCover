import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

const DashboardPage = () => {

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
                    href={'/dashboard/cover-letter'}
                    className={cn(buttonVariants({
                        variant: 'default',
                        size: 'sm'
                    }))}
                >
                    <Plus className='w-6 h-6 mr-2' />
                    Create cover letter
                </Link>
            </div>

            {/* TODO: list of all cover letter */}

            {/* Create new cover letter */}
        </MaxWidthWrapper>
    )
}

export default DashboardPage