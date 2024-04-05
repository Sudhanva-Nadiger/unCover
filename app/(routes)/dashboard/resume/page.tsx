import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import UploadResumeButton from './components/UploadResumeButton'
import { getAllResumes } from '@/lib/actions';
import { auth } from '@clerk/nextjs';
import ResumePreview from './components/ResumePreview';
import { Inbox } from 'lucide-react';


const ResumePage = async () => {
  const { userId } = auth();
  const [resumes, error] = await getAllResumes(userId);

  if (error) {
    return <div>{error.message || "Something went wrong"}</div>
  }


  return (
    <MaxWidthWrapper className='mt-8 sm:mt-20'>
      <div className='flex items-center justify-center'>
        <UploadResumeButton />
      </div>

      {
        resumes.length === 0 ? (
          <div className='mt-8 sm:mt-12 flex flex-col justify-center items-center text-center space-y-2'>
            <Inbox className='w-10 h-10' />
            <h3 className='text-2xl font-bold'>No Resumes Uploaded</h3>
            <p className='mt-4'>Upload your resume to get started</p>
          </div>
        ) : (
          <div className='mt-8'>
            <h2 className='text-2xl font-bold'>All Resumes</h2>
            <div className='mt-4 flex flex-wrap gap-4'>
              {resumes.map(resume => (
                <ResumePreview resume={resume} key={resume.resumeId} />
              ))}
            </div>
          </div>
        )
      }
    </MaxWidthWrapper>
  )
}

export default ResumePage