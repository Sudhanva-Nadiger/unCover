import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import UploadResumeButton from './components/UploadResumeButton'

const ResumePage = () => {
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