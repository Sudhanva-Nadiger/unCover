'use client'

import { CoverLetter as TCoverLetter } from '@/lib/schema'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"

import { useToast } from '@/components/ui/use-toast'
import { useSelectResume } from '@/hooks/useSelectPdf'
import { saveCoverLetterDetails } from '@/lib/actions'
import { useAuth } from '@clerk/nextjs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { TextItem } from 'pdfjs-dist/types/src/display/api'
import { FormEvent, memo, useState } from 'react'
import { pdfjs } from 'react-pdf'
import GeneratedCoverLetter from './CoverLetter'
import Form from './Form'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`


type Props = {
    coverLetter: TCoverLetter | null
}

const ChatWrapper = ({
    coverLetter,
}: Props) => {
    const [tab, setTab] = useState<'jd' | 'coverletter'>('jd')
    const [loading, setLoading] = useState<boolean>(false)
    const [jobDescription, setJobDescription] = useState<string>(coverLetter?.jobDescription || '')
    const [prompt, setPrompt] = useState<string | null>(coverLetter?.customPrompt || null)
    const [accumulatedText, setAccumulatedText] = useState<string>('')

    const { toast } = useToast()
    const { data } = useSelectResume()

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams()
    const { userId } = useAuth()

    const saveTheDetails = ((searchParams.get('created_clid') === null) && (coverLetter === null))
    let coverLetterId = searchParams.get('created_clid') || coverLetter?.coverLetterId


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setLoading(true)

            if (saveTheDetails) {
                const [res, err] = await saveCoverLetterDetails({
                    jobDescription: jobDescription,
                    resumeId: data.resumeId,
                    userId: userId!,
                    customPrompt: prompt || '',
                    response: ''
                });

                if (err) {
                    return toast({
                        title: 'Something went wrong',
                        description: 'Could not complete the request',
                        variant: 'destructive'
                    })
                }

                // const params = new URLSearchParams(searchParams);
                // params.set('created_clid', res.coverLetterId)

                window.history.replaceState(null, '', `?created_clid=${res.coverLetterId}`);

                coverLetterId = res.coverLetterId
            }


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

            setTab('coverletter')

            const completionResponse = await fetch('/api/completion', {
                method: 'POST',
                body: JSON.stringify({
                    extractedText,
                    coverLetterId,
                    jobDescription,
                    prompt
                }),
                cache: 'no-store'
            })

            if (!completionResponse.ok) {
                throw new Error("Could not generate the data")
            }

            const stream = completionResponse.body

            if (!stream) {
                throw new Error()
            }

            setLoading(false)

            const reader = stream.getReader()
            const decoder = new TextDecoder()

            let done = false
            let accumulator = ''
            while (!done) {
                const { value, done: doneReading } = await reader.read()
                done = doneReading

                if (!value) {
                    continue
                }

                const chunk = decoder.decode(value)

                accumulator += chunk ?? ''

                setAccumulatedText(accumulator)
            }

        } catch (error) {
            toast({
                title: 'Something went wrong',
                description: 'Could not complete the request',
                variant: 'destructive'
            })
        } finally {
            setLoading(false)
        }
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
                            <Form
                                handleSubmit={handleSubmit}
                                jobDescription={jobDescription}
                                setJobDescription={setJobDescription}
                                prompt={prompt}
                                setPrompt={setPrompt}
                                loading={loading}
                            />
                        </TabsContent>
                        <TabsContent value='coverletter' className='w-full'>
                            <GeneratedCoverLetter
                                loading={loading}
                                completion={coverLetter?.response || accumulatedText}
                            />
                        </TabsContent>
                    </Tabs>
                </div>

            </div>
        </div>
    )
}

const memoComponent = memo(ChatWrapper)
export default memoComponent