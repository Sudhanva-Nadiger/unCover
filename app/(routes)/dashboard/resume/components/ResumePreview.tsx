'use client'

import { ResumeDetail } from '@/lib/schema'
import { Expand, Loader } from 'lucide-react'
import { Document, Thumbnail } from 'react-pdf'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardFooter
} from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import DeleteResumeAlert from './DeleteResumeAlert'


type Props = {
    resume: ResumeDetail
}

const ResumePreview = ({
    resume
}: Props) => {
    const router = useRouter();
    return (
        <div className='h-full'>
            <Document
                file={resume.url}
                className={'flex items-center justify-center rounded'}
                loading={
                    <div className='w-full h-full'>
                        <Loader className='my-24 h-6 w-6 animate-spin' />
                    </div>
                }
            >
                <>
                    <Card className='relative rounded-sm group'>
                        <div className='items-end right-0 space-x-2 hidden group-hover:flex cursor-pointer absolute mt-1 mr-1 z-30'>
                            <DeleteResumeAlert resume={resume} />

                            <Button
                                size={'icon'}
                                onClick={() => router.push(`/dashboard/resume/${resume.resumeId}`)}
                            >
                                <Expand className='text-white' />
                            </Button>
                        </div>

                        <CardContent className='flex p-0 justify-center w-fit'>
                            <Thumbnail pageNumber={1} height={300} className={'flex-1 flex justify-center w-full rounded p-1 cursor-auto'} />
                        </CardContent>
                        <CardFooter className='text-primary absolute bottom-0 h-28 bg-black bg-opacity-85 rounded-t-xl rounded-b-sm z-10 w-full flex flex-col justify-around gap-2'>
                            <p className='w-full truncate'>{resume.fileName}</p>
                            <p className='text-sm'><span className='text-xs'>Modified at:</span> {resume.updatedAt?.toDateString() ?? resume.createdAt.toDateString()}</p>
                        </CardFooter>
                    </Card>
                </>
            </Document>
        </div>
    )
}

export default ResumePreview