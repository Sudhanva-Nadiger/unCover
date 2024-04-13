'use client'

import { useEffect, useState } from 'react'

import Dropzone from 'react-dropzone'
import { Cloud, File, Loader } from 'lucide-react'
import { Progress } from './ui/progress'
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation'
import { getTotalResumeCount, uploadResume } from '@/lib/actions'
import { storeResumeDetails } from '@/lib/actions'
import { Document, pdfjs } from 'react-pdf'
import { useUploadModal } from '@/hooks/useUploadModal'
import { PLANS } from '@/lib/config/stripe'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`


const UploadDropzone = ({
    isSubscribed,
    userId
}: {
    userId: string | null,
    isSubscribed?: boolean
}) => {
    const router = useRouter()

    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const [numPages, setNumPages] = useState<number | null>(null)
    const [processing, setProcessing] = useState<boolean>(false)
    const [file, setFile] = useState<File | null>(null)

    const { toast } = useToast()
    const { onClose } = useUploadModal();

    const maxPages = isSubscribed ? PLANS[1].pagesPerPdf : PLANS[0].pagesPerPdf
    const maxFileSize = isSubscribed ? PLANS[1].fileSize : PLANS[0].fileSize
    const resumeCount = isSubscribed ? PLANS[1].resumeCount : PLANS[0].resumeCount

    useEffect(() => {
        if (numPages !== null) {

            if (numPages > maxPages) {
                setFile(null)
                setNumPages(null)
                toast({
                    title: `Please upload a ${maxPages}  page resume`,
                    description: 'Please upgrade to pro version',
                    variant: 'destructive',
                })

                return
            }
            
            const fileSize = file?.size

            if(fileSize && (fileSize > maxFileSize * 1024 * 1024)) {
                setFile(null)
                setNumPages(null)
                toast({
                    title: `Please upload a file less than ${maxFileSize}MB`,
                    description: 'If you are Free plan user upgrader to Pro plan',
                    variant: 'destructive',
                })

                return
            }

            const startSimulatedProgress = () => {
                setUploadProgress(0)

                const interval = setInterval(() => {
                    setUploadProgress((prevProgress) => {
                        if (prevProgress >= 90) {
                            clearInterval(interval)
                            return prevProgress
                        }
                        return prevProgress + 5
                    })
                }, 500)

                return interval
            }


            const uploadFiletoSupabse = async (acceptedFile: File | null) => {

                if (!acceptedFile) {
                    return
                }


                setIsUploading(true)

                const progressInterval = startSimulatedProgress()

                const [totalResumeCount, countError] = await getTotalResumeCount(userId)

                if (countError) {
                    return toast({
                        title: 'Something went wrong',
                        description: 'Please try again later',
                        variant: 'destructive',
                    })
                }

                if(!isSubscribed && totalResumeCount > resumeCount) {
                    return toast({
                        title: 'Upgrade to Pro Plan',
                        description: 'You have reached the maximum limit of resumes',
                        variant: 'destructive',
                    })
                }

                const [data, error] = await uploadResume(userId, acceptedFile)

                if (!data || error) {
                    return toast({
                        title: 'Something went wrong',
                        description: 'Please try again later',
                        variant: 'destructive',
                    })
                }

                const { id } = data

                const [_, err] = await storeResumeDetails(userId, id, acceptedFile.name)

                if (err) {
                    return toast({
                        title: 'Something went wrong',
                        description: 'Please try again later',
                        variant: 'destructive',
                    })
                }

                toast({
                    title: 'Resume uploaded successfully',
                    description: 'Redirecting to resume page',
                    variant: 'default',
                })
                
                router.push(`/dashboard/resume/${id}`)

                clearInterval(progressInterval)
                setUploadProgress(100)

                onClose()
            }

            uploadFiletoSupabse(file)

        }
    }, [file, numPages, router, toast, userId, onClose])


    return (
        <Dropzone
            multiple={false}
            accept={
                {
                    'application/pdf': ['.pdf'],
                }
            }
            onDrop={(files) => {
                setProcessing(true)
                setFile(files[0])
            }}
            maxFiles={1}
        >
            {({ getRootProps, getInputProps }) => (
                <div
                    {...getRootProps({
                        onClick: (e) => {
                            e.stopPropagation()
                        }
                    })}
                    className='border h-64 m-4 border-dashed border-gray-300 rounded-lg'>
                    <div className='flex items-center justify-center h-full w-full'>
                        <label
                            htmlFor='dropzone-file'
                            className='flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'>
                            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                <Cloud className='h-6 w-6 text-zinc-500 mb-2' />
                                <p className='mb-2 text-sm text-zinc-700'>
                                    <span className='font-semibold'>
                                        Click to upload
                                    </span>{' '}
                                    or drag and drop
                                </p>
                                <p className='text-xs text-zinc-500'>
                                    PDF (up to {isSubscribed ? "4" : "1"}MB)
                                </p>
                            </div>

                            {file ? (
                                <div className='max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200'>
                                    <div className='px-3 py-2 h-full grid place-items-center'>
                                        <File className='h-4 w-4 text-primary' />
                                        <Document
                                            className={'hidden'}
                                            file={file}
                                            onLoadSuccess={({ numPages }) => {
                                                setNumPages(numPages)
                                                setProcessing(false)
                                            }}
                                            onError={(_) => toast({
                                                title: 'Something went wrong',
                                                description: 'Please try again later',
                                                variant: 'destructive',
                                            })}
                                            
                                        />
                                    </div>
                                    <div className='px-3 py-2 h-full text-sm truncate'>
                                        {file.name}
                                    </div>
                                </div>
                            ) : null}

                            {processing ? (
                                    <div className='flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2'>
                                        <Loader className='h-3 w-3 animate-spin' />
                                        Processing...
                                    </div>
                                ) : null
                            }

                            {isUploading ? (
                                <div className='w-full mt-4 max-w-xs mx-auto'>
                                    <Progress
                                        value={uploadProgress}
                                        className={'h-1 w-full bg-zinc-200'}
                                        indicatorColor={uploadProgress === 100 ? 'bg-green-500' : ''}
                                    />
                                    {uploadProgress === 100 ? (
                                        <div className='flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2'>
                                            <Loader className='h-3 w-3 animate-spin' />
                                            Redirecting...
                                        </div>
                                    ) : null}
                                </div>
                            ) : null}

                            <input
                                {...getInputProps()}
                                type='file'
                                id='dropzone-file'
                                className='hidden'
                            />
                        </label>
                    </div>
                </div>
            )}
        </Dropzone>
    )
}

export default UploadDropzone;