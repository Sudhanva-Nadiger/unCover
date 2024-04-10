'use client'

import { LucideTrash2 } from "lucide-react"

import { Button } from '@/components/ui/button'
import { toast } from "@/components/ui/use-toast"
import { useAlertModal } from "@/hooks/useAlertModal"
import { deleteResume } from "@/lib/actions"
import { ResumeDetail } from "@/lib/schema"
import { useEffect } from "react"
import AlertModal from "@/components/modals/AlertModal"

type Props = {
    resume: ResumeDetail
}

const DeleteResumeAlert = ({
    resume
}: Props) => {
    const { onOpen, isOpen, onClose } = useAlertModal();

    const handleDelete = async () => {
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
            onClose()
        }
    }

    return (
        <>
            <Button onClick={onOpen} variant={'destructive'} size={'icon'} className='items-center'>
                <LucideTrash2 />

                <AlertModal 
                    title="Are you sure you want to delete this resume?" 
                    description="This action cannot be undone."
                    onConfirm={handleDelete}
                    isOpen={isOpen}
                />
            </Button>
        </>
    )
}

export default DeleteResumeAlert