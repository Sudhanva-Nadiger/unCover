'use client'

import { CoverLetter } from '@/lib/schema'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"
import { useState } from 'react'


type Props = {
    coverLetter: CoverLetter | null
}

const ChatWrapper = ({

}: Props) => {
    const [tab, setTab] = useState('jd')

    return (
        <div className='w-full h-full'>
            <div className='flex flex-col w-full h-full'>
                <div className='flex items-center justify-center space-y-2'>
                    <Tabs defaultValue={tab} value={tab}>
                        <TabsList className='mt-2'>
                            <TabsTrigger onClick={() => setTab('jd')} value='jd'>Job description</TabsTrigger>
                            <TabsTrigger onClick={() => setTab('coverletter')} value='coverletter'>Cover letter</TabsTrigger>
                        </TabsList>
                        <TabsContent value='jd'>job description</TabsContent>
                        <TabsContent value='coverletter'>cover letter</TabsContent>
                    </Tabs>
                </div>

            </div>
        </div>
    )
}

export default ChatWrapper