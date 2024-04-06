import React from 'react'
import Pdf from './components/Pdf'
import { getAllResumes } from '@/lib/actions'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

type Props = {
    params: {
        coverletterId: string
    }
}

const CoverLetterPage = async ({
    params
}: Props) => {
    const { userId } = auth();

    const [resumes, error] = await getAllResumes(userId);

    if(error) {
        return (
            <div>{error.message || "Something went wrong"}</div>
        )
    }

    if(resumes.length === 0) {
        redirect('/dashboard/resume?open_uploader=true')
    }

    return (
        <div className='flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]'>
            <div className='mx-auto w-full max-w-8xl grow lg:flex xl:px-2'>
                <div className='flex-1 xl:flex'>
                    <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
                        <Pdf resumeDetails={resumes} />
                    </div>
                </div>

                <div className='shrink-0 flex-[0.75] border-t border-red-500 lg:w-96 lg:border-l lg:border-t-0'>
                    {/* <ChatWrapper isSubscribed={plan.isSubscribed} fileId={file.id} /> */}
                </div>
            </div>
        </div>
    )
}

export default CoverLetterPage;