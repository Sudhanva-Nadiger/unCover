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
    resumeDetails: ResumeDetail[]
}

const Pdf = ({
    resumeDetails
}: Props) => {

    const { onSelect, data } = useSelectResume();

    useEffect(() => {
        onSelect({
            fileName: resumeDetails[0].fileName,
            url: resumeDetails[0].url
        })
    }, [])
    

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
                            resumeDetails.map(detail => (<DropdownMenuItem key={detail.resumeId} onClick={() => onSelect({url: detail.url, fileName: detail.fileName})}>
                                {detail.fileName}
                            </DropdownMenuItem>))
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </PdfRenderer>
        </>
    )
}

export default Pdf