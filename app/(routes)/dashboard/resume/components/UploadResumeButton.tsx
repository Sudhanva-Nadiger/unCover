import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UploadDropzone from '@/components/Uploader';
import { auth } from '@clerk/nextjs';

const UploadResumeButton = ({
  className
}: {
  className?: string
}) => {
  const { userId } = auth();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'default'}
          size={'sm'}
          className={className}
        >
          <Plus className='w-6 h-6 mr-2' />
          Upload Resume
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Resume</DialogTitle>
          <DialogDescription>
            Upload your resume based on which your cover letter will be cooked 🎭.
          </DialogDescription>
        </DialogHeader>

        <UploadDropzone userId={userId} />
      </DialogContent>
    </Dialog>
  )
}

export default UploadResumeButton