import PdfRenderer from '@/components/PdfRenderer';
import { getResumeDetailsById } from '@/lib/actions/fileActions';
import { auth } from '@clerk/nextjs';

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

  if(error) {
    return <div>Resume not found</div>
  }

  return (
    <PdfRenderer url={resumeDetails.url} showBackArrow={true} />
  )
}

export default Resume