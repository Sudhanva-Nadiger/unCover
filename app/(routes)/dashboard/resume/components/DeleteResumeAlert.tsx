'use client'

import { Loader, LucideTrash2 } from "lucide-react"
import { useState } from "react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from '@/components/ui/button'
import { toast } from "@/components/ui/use-toast"
import { deleteResume } from "@/lib/actions"
import { ResumeDetail } from "@/lib/schema"

type Props = {
    resume: ResumeDetail
}

const DeleteResumeAlert = ({
    resume
}: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const handleDelete = async () => {
        setLoading(true)
        const [_, error] = await deleteResume(resume)
        if (error) {
            toast({
                title: "Something went wrong.",
                description: 'Could not delete the file',
                variant: 'destructive'
            })
        } else {
            toast({
                title: "Deleted successfully.",
            })
            setOpen(false)
        }
        setLoading(false)
    }

    return (
        <AlertDialog open={open}>
            <AlertDialogTrigger asChild>
                <Button onClick={() => setOpen(true)} variant={'destructive'} size={'icon'} className='items-center'>
                    <LucideTrash2 />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this resume?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this resume.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {
                        loading ? (
                            <div className="flex w-full justify-center items-center">
                                <Loader className='h-6 w-6 animate-spin' />
                            </div>
                        ) : (
                            <>
                                <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete} className={buttonVariants({
                                    variant: 'destructive'
                                })}>Delete</AlertDialogAction>
                            </>
                        )
                    }

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteResumeAlert