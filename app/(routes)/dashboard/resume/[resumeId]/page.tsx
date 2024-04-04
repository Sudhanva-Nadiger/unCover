import PdfRenderer from '@/components/PdfRenderer';
import { BUCKET_NAME } from '@/lib/constants';
import { supabase } from '@/lib/supabse';
import { auth } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { Document } from 'react-pdf';

interface ResumeProps {
  params: {
    resumeId: string;
  }
}

const Resume = async ({
  params
}: ResumeProps) => {
  const { userId } = auth();
  // TODO: get resume name action
  // const resumeName = await getResumeName(userId, params.resumeId)

  const { data } = await supabase.storage.from(BUCKET_NAME).getPublicUrl(`${userId}/Sudhanva_Nadiger.pdf`)

  console.log(data);
  

  if (!data || !data.publicUrl) {
    return <div>Resume not found</div>
  }

  return (
    <PdfRenderer url={data.publicUrl} />
  )
}

export default Resume