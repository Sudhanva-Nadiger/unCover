'use client';

import { Loader2 } from 'lucide-react';
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

type Props = {
    url: string
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const PdfRenderer = ({
    url
}: Props) => {

    return (
        <div>
            <Document
                loading={
                    <div className='flex justify-center'>
                        <Loader2 className='my-24 h-6 w-6 animate-spin' />
                    </div>
                }
                file={url}
                className={'flex items-center justify-center w-full border'}
            >
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