'use client'

import { CoverLetter } from '@/lib/schema'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useSelectResume } from '@/hooks/useSelectPdf'
import { saveCoverLetterDetails } from '@/lib/actions'
import { useToast } from '@/components/ui/use-toast'
import { usePathname, useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { pdfjs } from 'react-pdf'
import type { TextItem } from 'pdfjs-dist/types/src/display/api'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`


type Props = {
    coverLetter: CoverLetter | null
}

const ChatWrapper = ({
    coverLetter
}: Props) => {
    const [tab, setTab] = useState<'jd' | 'coverletter'>('jd')
    const [loading, setLoading] = useState<boolean>(false)
    const { toast } = useToast()
    const { data } = useSelectResume()
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams()

    const handleClick = async () => {
        setLoading(true)
        const resumeUrl = data.url;
        // handle updating or first time creation of cover letter
        const [res, err] = await saveCoverLetterDetails({
            jobDescription: 'hello',
            resumeId: data.resumeId,
            userId: '1',
            customPrompt: null,
            response: ''
        });

        if (err) {
            return toast({
                title: 'Something went wrong',
                description: 'Could not complete the request',
                variant: 'destructive'
            })
        }

        // only if first time creation
        const params = new URLSearchParams(searchParams);
        params.set('created_clid', res.coverLetterId)

        router.replace(`${pathname}?${params.toString()}`, {
            scroll: false
        })


        const response = await fetch(data.url)
        const blob = await response.blob()

        const blobUrl = URL.createObjectURL(blob)

        const pdfLoader = pdfjs.getDocument(blobUrl)
        const pdf = await pdfLoader.promise

        const numPages = pdf.numPages
        let extractedText = ``

        for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i)
            const textContent = await page.getTextContent()
            const pageText = (textContent.items as TextItem[]).map((item) => item.str).join(" ")
            extractedText += pageText
        }

        const apiResponse : any = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: resumeUrl,
                coverLetterId: res.coverLetterId
            })
        })

    }


    return (
        <div className='w-full h-full'>
            <div className='flex flex-col w-full h-full'>
                <div className='flex items-center justify-center space-y-2'>
                    <Tabs defaultValue={tab} value={tab} className='w-full flex flex-col items-center'>
                        <TabsList className='mt-2'>
                            <TabsTrigger onClick={() => setTab('jd')} value='jd'>Job description</TabsTrigger>
                            <TabsTrigger onClick={() => setTab('coverletter')} value='coverletter'>Cover letter</TabsTrigger>
                        </TabsList>
                        <TabsContent value='jd' className='w-full'>
                            <div>
                                {JSON.stringify(coverLetter)}
                            </div>
                            <Button className='w-full' onClick={handleClick}>
                                Generate
                            </Button>
                        </TabsContent>
                        <TabsContent value='coverletter'>cover letter</TabsContent>
                    </Tabs>
                </div>

            </div>
        </div>
    )
}

export default ChatWrapper