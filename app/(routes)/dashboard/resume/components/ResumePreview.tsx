import { ResumeDetail } from '@/lib/schema'
import React from 'react'

type Props = {
    resume: ResumeDetail
}

const ResumePreview = ({
    resume
}: Props) => {
  return (
    <div>{resume.fileName}</div>
  )
}

export default ResumePreview