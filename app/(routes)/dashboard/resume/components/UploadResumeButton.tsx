'use client'

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useUploadModal } from '@/hooks/useUploadModal';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';

const UploadResumeButton = ({
  className,
  openUploader
}: {
  className?: string
  openUploader?: boolean
}) => {

  const { onOpen } = useUploadModal()
  const { toast } = useToast()

  useEffect(() => {
    if (openUploader) {
      onOpen()
      toast({
        title: 'Upload your resume',
        description: 'Upload your resume to get started'
      })
    }
  }, [openUploader, onOpen])

  return (

    <Button
      variant={'default'}
      size={'sm'}
      className={className}
      onClick={onOpen}
    >
      <Plus className='w-6 h-6 mr-2' />
      Upload Resume
    </Button>
  )
}

export default UploadResumeButton