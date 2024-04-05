import PdfRenderer from '@/components/PdfRenderer';
import { getResumeDetailsById } from '@/lib/actions/filaActions';
import { BUCKET_NAME } from '@/lib/constants';
import { supabase } from '@/lib/supabse';
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

  const { data } = await supabase.storage.from(BUCKET_NAME).getPublicUrl(`${userId}/${resumeDetails.fileName}`)

  console.log(data);
  

  if (!data || !data.publicUrl) {
    return <div>Resume not found</div>
  }

  return (
    <PdfRenderer url={data.publicUrl} />
  )
}

export default Resume