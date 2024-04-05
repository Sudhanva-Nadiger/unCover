import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import UploadResumeButton from './components/UploadResumeButton'
import { getAllResumes } from '@/lib/actions';
import { auth } from '@clerk/nextjs';

const ResumePage = async () => {
  const { userId } = auth();
  const [resumes, error] = await getAllResumes(userId);

  if(error) {
    return <div>{error.message || "Something went wrong"}</div>
  }


  return (
    <MaxWidthWrapper className='mt-8 sm:mt-20'>
      <div className='flex items-center justify-center'>
        <UploadResumeButton />
      </div>

      {/* all resume preview */}
    </MaxWidthWrapper>
  )
}

export default ResumePage