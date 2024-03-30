import React from 'react'

interface ResumeProps {
    params: {
        resumeId: string;
    }
}

const Resume = ({
    params
}: ResumeProps) => {
  return (
    <div>{params.resumeId}</div>
  )
}

export default Resume