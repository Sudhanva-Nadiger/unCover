'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader } from 'lucide-react'
import React from 'react'

type Props = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    jobDescription: string
    setJobDescription: (value: string) => void
    prompt: string | null
    setPrompt: (value: string) => void,
    loading?: boolean
}

const Form = ({
    handleSubmit,
    jobDescription,
    setJobDescription,
    prompt,
    setPrompt,
    loading
}: Props) => {
    return (
        <div className='flex flex-col m-2 shadow rounded'>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-4 items-center w-full h-full p-2'>
                <Textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={10}
                    aria-label='Job description'
                />
                <Input
                    value={prompt ?? ''}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder='Prompt'
                    aria-label='Prompt'
                />

                <Button disabled={loading} type='submit' className='w-full'>
                    {loading ? <Loader className='w-6 h-6 animate-spin' /> : 'Generate'}
                </Button>
            </form>
        </div>
    )
}

export default Form