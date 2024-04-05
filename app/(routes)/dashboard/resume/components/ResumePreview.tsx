'use client'

import { ResumeDetail } from '@/lib/schema'
import { Loader } from 'lucide-react'
import { Document, Thumbnail } from 'react-pdf'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import {
    Card,
    CardContent,
    CardFooter
} from "@/components/ui/card"
import DeleteResumeAlert from './DeleteResumeAlert'
import { useRouter } from 'next/navigation'


type Props = {
    resume: ResumeDetail
}

const ResumePreview = ({
    resume
}: Props) => {
    const router = useRouter();
    return (
        <div className=''>
            <Document
                file={resume.url}
                className={'flex items-center justify-center rounded'}
                loading={
                    <div className='w-[200]'>
                        <Loader className='my-24 h-6 w-6 animate-spin' />
                    </div>
                }
            >
                <Card className='relative rounded-sm group cursor-none' onClick={() =>router.push(`/dashboard/resume/${resume.resumeId}`)}>
                    <DeleteResumeAlert resume={resume} />

                    <CardContent className='flex p-0 justify-center w-fit'>
                        <Thumbnail pageNumber={1} width={200} className={'flex-1 flex justify-center w-full rounded p-1'} />
                    </CardContent>
                    <CardFooter className='text-primary absolute bottom-0 h-28 bg-black bg-opacity-85 rounded-t-xl rounded-b-sm z-10 w-full flex flex-col justify-end gap-2'>
                        <p className='w-full truncate'>{resume.fileName}</p>
                        <p className='text-sm'><span className='text-xs'>Modified at:</span> {resume.updatedAt?.toDateString() ?? resume.createdAt.toDateString()}</p>
                    </CardFooter>
                </Card>
            </Document>
        </div>
    )
}

export default ResumePreview