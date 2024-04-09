'use client'

import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { Copy, Loader } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

type Props = {
    loading?: boolean
    completion?: string
}

const CoverLetter = ({
    loading,
    completion
}: Props) => {
    const { toast }= useToast()

    const handleClick = () => {
        navigator.clipboard.writeText(completion || '')
        toast({
            title: 'Copied!',
            description: 'Cover letter copied to clipboard'
        })
    }

    if (loading ) {
        return (
            <div className='w-full h-full flex flex-col items-center justify-center space-y-2'>
                <Loader className='w-6 h-6 animate-spin' />
                <p className='text-sm text-gray-600 animate-pulse'>Generating your cover letter....</p>
            </div>
        )
    }

    if(!completion || completion.length === 0) {
        return (
            <div className='w-full h-full flex flex-col items-center justify-center space-y-2'>
                <p className='text-sm text-gray-600'>No cover letter generated...</p>
            </div>
        )
    }

    return (
        <div className='flex flex-col w-ful justify-center'>
            <div className='mx-1 sm:mx-4 my-2 p-2 sm:p-4 rounded shadow bg-secondary space-y-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-2xl text-secondary-foreground'>Cover Letter</h1>
                    <Copy 
                        aria-label='copy cover letter' 
                        className={cn(buttonVariants({
                        variant: 'ghost',
                        size: 'icon'
                        }), 'w-8 h-8 p-1 cursor-pointer')}
                        onClick={handleClick}
                     />
                </div>

                <Separator />
                <ReactMarkdown className='w-full'>{completion}</ReactMarkdown>
            </div>
        </div>
    )
}

export default CoverLetter