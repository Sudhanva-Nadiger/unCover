import PdfRenderer from '@/components/PdfRenderer';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getResumeDetailsById } from '@/lib/actions/fileActions';
import { cn } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ResumeProps {
  params: {
    resumeId: string;
  }
}

const Resume = async ({
  params
}: ResumeProps) => {
  const { userId } = auth();

  const [resumeDetails, error] = await getResumeDetailsById(userId, params.resumeId)

  if (error) {
    return <div>Resume not found</div>
  }

  return (
    <div className='space-y-2 w-[90%]'>
      <div className='flex flex-col justify-center items-center w-full space-x-3'>
        <Link href={'/dashboard/resume'} className={cn(buttonVariants({
          variant: 'outline'
        }), 'mt-4')}>
          <ArrowLeft className='w-6 h-r mr-2' />
          Go back
        </Link>
      </div>
      <PdfRenderer url={resumeDetails.url} />
    </div>
  )
}

export default Resume