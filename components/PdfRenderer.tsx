'use client';

import { cn } from '@/lib/utils';
import { ArrowLeft, Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { buttonVariants } from './ui/button';
import Link from 'next/link';
import { Separator } from './ui/separator';

type Props = {
    url: string;
    showBackArrow?: boolean
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const PdfRenderer = ({
    url,
    showBackArrow
}: Props) => {

    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null

    return (
        <div>
            <Document
                loading={
                    <div className='flex justify-center'>
                        <Loader className='my-24 h-6 w-6 animate-spin' />
                    </div>
                }
                file={url}
                className={'flex flex-col items-center justify-center w-full border space-y-4'}
            >
                {showBackArrow && <div className='flex flex-col justify-center items-center w-full space-y-3'>
                    <Link href={'/dashboard/resume'} className={cn(buttonVariants({
                        variant: 'outline'
                    }), 'mt-4')}>
                        <ArrowLeft className='w-6 h-r mr-2' />
                        Go back
                    </Link>
                    
                    <Separator className='w-[90%]' />
                </div>}
                <Page
                    className={'border shadow-xl rounded-sm my-2 h-fit'}
                    pageNumber={1}
                    renderTextLayer={false}
                    width={window.innerWidth - 32}
                    scale={0.8}
                />
            </Document>
        </div>
    )
}

export default PdfRenderer