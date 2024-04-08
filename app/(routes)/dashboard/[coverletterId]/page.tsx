import React from 'react'
import Pdf from './components/Pdf'
import { fetchCoverLetterById, getAllResumes } from '@/lib/actions'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ChatWrapper from './components/ChatWrapper'

type Props = {
    params: {
        coverletterId: string
    },
    searchParams: {
        created_clid: string
    }
}

const CoverLetterPage = async ({
    params,
    searchParams
}: Props) => {
    const { userId } = auth();

    const [resumes, error] = await getAllResumes(userId);

    const id = searchParams.created_clid ?? params.coverletterId;
    console.log("hello******", id);
    
    const [coverLetter, err] = await fetchCoverLetterById(userId, id);

    console.log("cover letter******", coverLetter);
    

    if(params.coverletterId !== 'new' && err) {
        return (
            <div>{err.message || "Something went wrong"}</div>
        )
    }

    if(params.coverletterId !== 'new' && !coverLetter) {
        return (
            <div className='flex flex-col'>
                <div className='mx-auto w-full max-w-8xl'>
                    <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:pl-6'>
                        <div className='text-center'>
                            <h1 className='text-2xl font-semibold'>Cover Letter not found</h1>
                        </div>
                    </div>
                </div>

                <Link href={'/dashboard'}>
                    <ArrowLeft className='w-6 h-6 mr-2' />
                    <span>Back to Dashboard</span>
                </Link>
            </div>
        )
    }

    if(error) {
        return (
            <div>{error.message || "Something went wrong"}</div>
        )
    }

    if(resumes.length === 0) {
        redirect('/dashboard/resume?open_uploader=true')
    }

    return (
        <div className='w-full justify-between flex flex-col h-[calc(100vh-3.5rem)]'>
            <div className='mx-auto w-full max-w-8xl grow lg:flex xl:px-2'>
                <div className='flex-1 xl:flex'>
                    <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
                        <Pdf resumeDetails={resumes} initialId={coverLetter?.resumeId} />
                    </div>
                </div>

                <div className='shrink-0 flex-1 border-t border-gray-300 lg:w-96 lg:border-l lg:border-t-0'>
                    <ChatWrapper coverLetter={coverLetter} />
                </div>
            </div>
        </div>
    )
}

export default CoverLetterPage;