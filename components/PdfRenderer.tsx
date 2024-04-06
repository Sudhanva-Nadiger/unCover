'use client';

import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Loader } from 'lucide-react';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useResizeDetector } from 'react-resize-detector'

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from './ui/use-toast';

type Props = {
    url: string;
    children?: React.ReactNode
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const PdfRenderer = ({
    url,
    children
}: Props) => {

    const [numPages, setNumPages] = useState<number>(0)
    const [currPage, setCurrPage] = useState<number>(1)
    const [error, setError] = useState<boolean>(false)
    const [scale, _] = useState<number>(1)
    const [renderedScale, setRenderedScale] = useState<number | null>(null)

    const isLoading = renderedScale !== scale

    const { width, ref } = useResizeDetector()


    const handleSubmit = () => {
        if (currPage <= 0 || currPage > numPages || isNaN(currPage)) {
            setError(true)
        } else {
            setNumPages(currPage + 1)
        }
    }

    return (
        <div className='w-full h-full bg-white rounded-md shadow flex flex-col items-center'>
            <div className='h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2'>
                <div className='flex items-center gap-1.5'>
                    <Button
                        disabled={currPage <= 1}
                        onClick={() => {
                            setCurrPage((prev) =>
                                prev - 1 > 1 ? prev - 1 : 1
                            )

                        }}
                        variant='ghost'
                        aria-label='previous page'>
                        <ChevronDown className='h-4 w-4' />
                    </Button>

                    <div className='flex items-center gap-1.5'>
                        <Input
                            type='number'
                            min={1}
                            max={numPages || 1}
                            value={currPage}
                            className={cn(
                                'w-12 h-8',
                                error && 'focus-visible:ring-red-500'
                            )}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit()
                                }
                            }}
                            onChange={(e) => {
                                if (currPage <= 0 || currPage > numPages || isNaN(currPage)) {
                                    setError(true)
                                } else {
                                    setNumPages(+e.target.value)
                                }
                            }}
                        />
                        <p className='text-zinc-700 text-sm space-x-1'>
                            <span>/</span>
                            <span>{numPages ?? 'x'}</span>
                        </p>
                    </div>

                    <Button
                        disabled={
                            numPages === undefined ||
                            currPage === numPages
                        }
                        onClick={() => {
                            setCurrPage((prev) =>
                                prev + 1 > numPages! ? numPages! : prev + 1
                            )
                        }}
                        variant='ghost'
                        aria-label='next page'>
                        <ChevronUp className='h-4 w-4' />
                    </Button>
                </div>

                <div className='space-x-2'>
                    {children}
                </div>
            </div>

            <div className='flex-1 w-full h-fit'>
                <div className='h-fit'>
                    <div ref={ref}>
                        <Document
                            loading={
                                <div className='flex justify-center h-full'>
                                    <Loader className='my-24 h-6 w-6 animate-spin' />
                                </div>
                            }
                            onLoadError={() => {
                                toast({
                                    title: 'Error loading PDF',
                                    description: 'Please try again later',
                                    variant: 'destructive',
                                })
                            }}
                            onLoadSuccess={({ numPages }) =>
                                setNumPages(numPages)
                            }
                            file={url}
                            className='max-h-full shadow'>
                            {isLoading && renderedScale ? (
                                <Page
                                    width={width ? width : 1}
                                    pageNumber={currPage}
                                    scale={scale}
                                    key={'@' + renderedScale}
                                />
                            ) : null}

                            <Page
                                className={cn(isLoading ? 'hidden' : '')}
                                width={width ? width : 1}
                                pageNumber={currPage}
                                scale={scale}
                                key={'@' + scale}
                                loading={
                                    <div className='flex justify-center'>
                                        <Loader className='my-24 h-6 w-6 animate-spin' />
                                    </div>
                                }
                                onRenderSuccess={() =>
                                    setRenderedScale(scale)
                                }
                            />
                        </Document>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PdfRenderer