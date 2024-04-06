'use client'

import PdfRenderer from '@/components/PdfRenderer'
import { ResumeDetail, resumeDetail } from '@/lib/schema'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSelectResume } from '@/hooks/useSelectPdf'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'


type Props = {
    resumeDetails: ResumeDetail[];
    initialId?: string;
}

const Pdf = ({
    resumeDetails,
    initialId
}: Props) => {

    const { onSelect, data } = useSelectResume();

    useEffect(() => {
        const resume = initialId ? resumeDetails.find(resume => resume.resumeId === initialId)  || resumeDetails[0] : resumeDetails[0];

        onSelect({
            fileName: resume.fileName,
            url: resume.url,
            resumeId: resume.resumeId
        })

    }, [initialId])


    return (
        <>
            <PdfRenderer url={data.url}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'outline'} className='truncate'>
                            {data.fileName}
                            <ChevronDown className='h-4 w-4 ml-2' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Select resume</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {
                            resumeDetails.map(detail => (
                                <DropdownMenuItem
                                    key={detail.resumeId}
                                    onClick={() => onSelect({
                                        url: detail.url,
                                        fileName: detail.fileName,
                                        resumeId: detail.resumeId
                                    })}
                                >
                                    {detail.fileName}
                                </DropdownMenuItem>
                            ))
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </PdfRenderer>
        </>
    )
}

export default Pdf